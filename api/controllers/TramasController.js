/**
 * TramasController
 *
 * @description :: Server-side logic for managing Tramas
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var nmea = require('nmea');
var header, data, ts;
exports.parse = function (newBuffer, sensorFlags, size) {
  header = parseHeader(newBuffer.slice(4, 5).readInt8(0, 0));
  data = newBuffer.slice(5, size - 7);
  ts = newBuffer.slice(size - 7, size - 3);

  //console.log("Data");
  //console.log(data);
  //console.log("TS");
  //console.log(ts);

  var result;
  if (header.type == 0) { // GPS
    //console.log("" + data);
    //nmeaParse = nmea.parse("" + data);
    //console.log(nmeaParse);
    //console.log("Lat: " + nmeaParse.lat + " Lon: " + nmeaParse.lon + " horDilution: " + nmeaParse.horDilution);

    result = parseGPS(data);
  } else if (header.type == 1) { // Motion
    //console.log("################# PARSE Motion #################");
    //console.log(data);
    result = parseMotion(data, header.sensorID, sensorFlags);
    //socket.emit('updatechart', parseMotion(data, header.sensorID, sensorFlags));
  } else { // Other
    console.log("\033[31m################# OTHER TYPE #################");
    console.log(newBuffer.slice(0, size));
    console.log("\033[0m");
  }
  return {type: header.type, result: result};
};

function parseHeader(POS4) {
  var sensorID = POS4 & 0x1F;
  var r = (POS4 >> 5) & 0x01;
  var type = (POS4 >> 6) & 0x03;

  return {sensorID: sensorID, r: r, type: type};
}

function parseMotion(data, sensorID, sensorFlags) {
  var resultSocket = {};
  var macAux, mgyAux, mcoAux, tem;
  var macX, macY, macZ, mgyX, mgyY, mgyZ, mcoX, mcoY, mcoZ;
  var precision = 2;

  if (sensorID == sensorFlags.sensorN) {
    if (sensorFlags.motion.flagMAC) {

      macAux = data.slice(0, 6);
      // MAC
      macX = ((macAux.slice(0, 2).readInt16BE(0, 0) / 2048));
      macY = ((macAux.slice(2, 4).readInt16BE(0, 0) / 2048));
      macZ = ((macAux.slice(4, 6).readInt16BE(0, 0) / 2048));

      resultSocket.MAC = {
        "x": macX.toFixed(precision),
        "y": macY.toFixed(precision),
        "z": macZ.toFixed(precision)
      };
      //console.log(resultSocket.MAC);
    }

    if (sensorFlags.motion.flagMGY) {
      mgyAux = data.slice(6, 12);
      // MGY
      mgyX = (mgyAux.slice(0, 2).readInt16BE(0, 0) / 16.4).toFixed(precision);
      mgyY = (mgyAux.slice(2, 4).readInt16BE(0, 0) / 16.4).toFixed(precision);
      mgyZ = (mgyAux.slice(4, 6).readInt16BE(0, 0) / 16.4).toFixed(precision);

      resultSocket.MGY = {
        "x": mgyX.toFixed(precision),
        "y": mgyY.toFixed(precision),
        "z": mgyZ.toFixed(precision)
      };
    }

    if (sensorFlags.motion.flagMCO) {
      mcoAux = data.slice(12, 18);
      // MCO
      mcoX = (mcoAux.slice(0, 2).readInt16BE(0, 0) / 1.71).toFixed(precision);
      mcoY = (mcoAux.slice(2, 4).readInt16BE(0, 0) / 1.71).toFixed(precision);
      mcoZ = (mcoAux.slice(4, 6).readInt16BE(0, 0) / 1.71).toFixed(precision);

      resultSocket.MCO = {
        "x": mcoX.toFixed(precision),
        "y": mcoY.toFixed(precision),
        "z": mcoZ.toFixed(precision)
      };
    }

    if (sensorFlags.motion.flagTEM) {
      // TEM
      tem = (data.slice(18, 20).readInt16BE(0, 0) / 333.87 + 21).toFixed(precision);
      //console.log(tem);
      resultSocket.TEM = {
        "tem": tem//tem.toFixed(precision)
      };
    }
  }
  //console.log(resultSocket);
  return resultSocket;
}

function parseGPS(data) {
  return nmea.parse("" + data);
}

