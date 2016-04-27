/**
 * TesteGraphController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

  index: function (req, res) {
    res.view({
      title: "Graphs",
      user: req.user
    });
  },

  teste1: function (req, res) {
    res.view({
      title: "Random ODD Series",
      user: req.user
    });
  },
  teste2: function (req, res) {
    res.view({
      title: "Random Charts",
      user: req.user
    });
  },
  teste5: function (req, res) {
    res.view({
      title: "Random Real Time Data",
      user: req.user
    });
  },
  gauge1: function (req, res) {
    res.view({
      title: "Gauge1",
      user: req.user
    });
  },
  gauge2: function (req, res) {
    res.view({
      title: "Gauge2",
      user: req.user
    });
  },

  temperature: function (req, res) {
    res.view({
      title: "Temperature",
      user: req.user
    });
  },
  heapmap: function (req, res) {
    res.view({
      title: "HeapMap - Acceleration",
      user: req.user
    });
  },
  map: function (req, res) {
    res.view({
      title: "Map",
      user: req.user
    });
  },

  radarchart: function (req, res) {
    res.view({
      title: "Radar Chart",
      user: req.user
    });
  },

  acceleration: function (req, res) {
    res.view({
      title: "Acceleration",
      user: req.user
    });
  },

  serverconnections1: function (req, res) {
    res.view({
      title: "serverconnections1",
      user: req.user
    });
  },

  serverconnections2: function (req, res) {
    res.view({
      title: "serverconnections2",
      user: req.user
    });
  },

  acceleration2acceleration: function (req, res) {
    res.view({
      title: "Acceleration2Acceleration",
      user: req.user
    });
  },

  accelerationRealTime: function (req, res) {

    //console.log("portCom: " + req.param('portCom') + " sensorN: "+ req.param('sensorN') + " type: " + req.param('type'));
    //if (req.param('portCom') != undefined && req.param('sensorN') != undefined && req.param('type') != undefined) {

    var paramObj = {
      portCom: req.param('portCom') != undefined ? req.param('portCom') : "COM5",
      sensorN: req.param('sensorN') != undefined ? req.param('sensorN') : 1,
      type: req.param('type') != undefined ? req.param('type') : "MAC",
      flagSave: req.param('save') != undefined ? req.param('save') : false
    };
    //console.log(paramObj);
    var sensorFlags = {
      sensorN: paramObj.sensorN,
      motion: {
        flagMAC: paramObj.type == "MAC",
        flagMGY: paramObj.type == "MGY",
        flagMCO: paramObj.type == "MOC",
        flagGPS: paramObj.type == "GPS",
        flagTEM: paramObj.type == "TEM"
      }
    };

    /*var sensorFlags = {
     sensorN: 2,
     motion: {flagMAC: true, flagMGY: false, flagMCO: false, flagGPS: false, flagTEM: false}
     };*/

//console.log(sensorFlags);
    socketinteraction(paramObj, sensorFlags);
    //res.json({result:"OK"});

    //} else {
    //var listSerialPorts = getListSerialPort();
    var listSerialPorts = ["COM5"];
    var listSensors = [0, 1, 2];
    var listType = ["MAC", "MGY", "MCO", "GPS", "TEM"];

    res.view({
      title: "Acceleration & Gyroscope Real Time",
      user: req.user,
      listSerialPorts: listSerialPorts,
      listSensors: listSensors,
      listTypes: listType
    });
    // }
  },

  //accelerationRealTime123: function (req, res) {
  //  var io = sails.io;
  //  var sp = require("serialport");
  //  var nmea = require('nmea');
  //  var SerialPort = sp.SerialPort;
  //
  //  var listSerialPorts = [];
  //
  //  sp.list(function (err, ports) {
  //    listSerialPorts.push(ports);
  //    ports.forEach(function (port) {
  //      console.log(port.comName);
  //      console.log(port.pnpId);
  //      console.log(port.manufacturer);
  //    });
  //  });
  //
  //  var listSensors = [1, 2];
  //
  //  var serialPortOptions = {
  //    baudrate: 9600,
  //    dataBits: 8,
  //    parity: 'none',
  //    stopBits: 1,
  //    flowControl: false,
  //    parser: sp.parsers.raw
  //  };
  //
  //  var newBuffer = new Buffer(56);
  //  var fof = new Buffer([0xff, 0x00, 0xff]);
  //  var off = new Buffer([0x00, 0xff, 0xff]);
  //
  //  io.sockets.on('connection', function (socket) {
  //    var serialPort = new SerialPort("COM5", serialPortOptions);
  //    socket.on('addSensor', function (listSensors, listParameters) {
  //      socket.join("room");
  //
  //      serialPort.on("open", function () {
  //        serialPort.on('data', function (data) {
  //          newBuffer = Buffer.concat([newBuffer, data]);
  //        });
  //
  //        serialPort.on('error', function (err) {
  //          console.error("error", err);
  //        });
  //      });
  //    });
  //
  //    socket.on('disconnect', function () {
  //      socket.leave("room");
  //      serialPort.on('close', function (err) {
  //        serialPort.close();
  //        console.log('port closed', err);
  //      });
  //    });
  //
  //    var gps;
  //    var POS4, type, r, sensorID;
  //
  //    var sensorFlags = {
  //      sensorN: 0,
  //      motion: {flagMAC: true, flagMGY: false, flagMCO: false, flagGPS: false, flagTEM: false}
  //    };
  //    var count = 0;
  //    var countFor = 0;
  //    setInterval(
  //      function () {
  //        count++;
  //
  //        // Criar "for" -> mix setInterval
  //
  //        for (countFor = 0; countFor < 10; countFor++) {
  //          if (newBuffer.slice(0, 3).equals(fof) && newBuffer.length > 3) {
  //            var size = newBuffer.slice(3, 4).readInt8(0, 0);
  //
  //            if (newBuffer.length >= size) {
  //              if (newBuffer.slice(size - 3, size).equals(off)) {
  //                var header = parseHeader(newBuffer.slice(4, 5).readInt8(0, 0));
  //                var data = newBuffer.slice(5, size - 7);
  //                var ts = newBuffer.slice(size - 7, size - 3);
  //                if (header.type == 0) { // GPS
  //                  var nmeaParse = nmea.parse("" + data);
  //                  newBuffer = newBuffer.slice(size, newBuffer.length);
  //                } else if (header.type == 1) { // Motion
  //                  socket.emit('updatechart', parseMotion(data, header.sensorID, sensorFlags));
  //                  newBuffer = newBuffer.slice(size, newBuffer.length);
  //                } else { // Other
  //                  console.log("\033[31m################# OTHER TYPE #################");
  //                  console.log(newBuffer.slice(0, size));
  //                  console.log("\033[0m");
  //                }
  //              } else {
  //                while (!newBuffer.slice(1, 4).equals(fof)) {
  //                  newBuffer = newBuffer.slice(2, newBuffer.length);
  //                  if (newBuffer.length < 4) {
  //                    break;
  //                  }
  //                }
  //              }
  //            }
  //          } else { // Descartar bytes "desconhecidos"
  //            while (!newBuffer.slice(0, 3).equals(fof)) {
  //              newBuffer = newBuffer.slice(1, newBuffer.length);
  //              if (newBuffer.length < 3) {
  //                break;
  //              }
  //
  //              /*
  //               var pos = -1;
  //               var flagFOF = false;
  //               var lengthMax = (newBuffer.length > 100) ? 100 : newBuffer.length;
  //               for (var i = 0; i < lengthMax - 2; i++) {
  //               pos = i;
  //               if (newBuffer.slice(i, i + 3).equals(fof)) {
  //               flagFOF = true;
  //               break;
  //               }
  //               }
  //               if (flagFOF) {
  //               console.log(" XXXXXXXXXXXXXXXXXXXXXXXX Descartar bytes 'desconhecidos' XXXXXXXXXXXXXXXXXXXXXXXX");
  //               console.log(newBuffer.slice(0, pos));
  //               newBuffer = newBuffer.slice(pos, newBuffer.length);
  //               }
  //               */
  //            }
  //          }
  //        }
  //      }, 100);
  //  });
  //
  //  res.view({
  //    title: "Acceleration & Gyroscope Real Time",
  //    user: req.user,
  //    listSerialPorts: listSerialPorts,
  //    listSensors: listSensors,
  //    listParameters: ["MAC", "MGY", "MCO", "GPS", "TEM"]
  //  });
  //},

  temperatureRealTime: function (req, res) {
    var paramObj = {
      portCom: "COM5",
      type: req.param('type') != undefined ? req.param('type') : "TEM"
    };

    var sensorFlags = {
      sensorN: 2,
      motion: {flagMAC: false, flagMGY: false, flagMCO: false, flagGPS: false, flagTEM: true}
    };

    socketinteraction(paramObj, sensorFlags);

    var listSensors = [0, 1, 2]; // Origem Base de dados ou Porta de Série?

    var listSerialPorts = getListSerialPort();

    res.view({
      title: "Acceleration & Gyroscope Real Time",
      user: req.user,
      listSerialPorts: listSerialPorts,
      listSensors: listSensors,
      listParameters: ["MAC", "MGY", "MCO", "GPS", "TEM"]
    });

  },

  mapacc: function (req, res) {
    res.view({
      title: "Map & Acceleration",
      user: req.user
    });
  },

  windchart: function (req, res) {
    res.view({
      title: "Acceleration (Wind Chart)",
      user: req.user
    });
  },

  threejs: function (req, res) {
    res.view({
      title: "Threejs",
      user: req.user
    });
  },

  getData: function (req, res) {
    var paramObj = {
      id: req.param('id'),
      type: req.param('type'),
      sensorId: req.param('sensorId')
    };

    OnGoingDataCollection.query('SELECT DataCollectionTime, DataCollectionValue FROM ongoingdatacollection WHERE InformationTypeId=' + paramObj.type + ' AND TrackSessionConfigurationId=' + paramObj.id + ' AND sensorN=' + paramObj.sensorId + ' ORDER BY DataCollectionTime;', function (err, results) {
      var result = [];
      var sumTime = 0;
      var sumValue1 = 0;
      var sumValue2 = 0;
      var sumValue3 = 0;
      var i = 1;
      var xyz = '';
      if (paramObj.type == 1) { //GPS
        result = results;
      } else if (paramObj.type == 2 || paramObj.type == 3 || paramObj.type == 4) { //Accelerometer //Gyroscope //Compass
        /**results.forEach(function (d) {
                        xyz = d["DataCollectionValue"].split(',');
                        sumTime += d["DataCollectionTime"];
                        sumValue1 += parseInt(xyz[0]);
                        sumValue2 += parseInt(xyz[1]);
                        sumValue3 += parseInt(xyz[2]);
                        if (i % 10 == 0 || i == results.length) {
                            //result.push({'DataCollectionTime': sumTime / i, 'DataCollectionValue': sumValue1 / i + ',' + sumValue2 / i + ',' + sumValue3 / i});
                            result.push({'DataCollectionTime': sumTime/i, 'DataCollectionValue': sumValue1 / i + ',' + sumValue2 / i + ',' + sumValue3 / i});
                            sumTime = 0;
                            sumValue1 = 0;
                            sumValue2 = 0;
                            sumValue3 = 0;
                            i = 0;
                        }
                        i++;
                    });/**/
        results.forEach(function (d) {
          xyz = d["DataCollectionValue"].split(',');
          result.push({
            'DataCollectionTime': d["DataCollectionTime"],
            'DataCollectionValue': parseFloat(xyz[0]).toFixed(2) + ',' + parseFloat(xyz[1]).toFixed(2) + ',' + parseFloat(xyz[2]).toFixed(2)
          });
          i++;
        });
      } else if (paramObj.type == 5) { //Temperature
        results.forEach(function (d) {
          sumTime += d["DataCollectionTime"];
          sumValue1 += parseInt(d["DataCollectionValue"]);
          if (i % 10 == 0 || i == results.length) {
            result.push({'DataCollectionTime': sumTime / i, 'DataCollectionValue': sumValue1 / i});
            sumTime = 0;
            sumValue1 = 0;
            i = 0;
          }
          i++;
        });
      }
      res.json(result);
    });
  },

  getDataRotated: function (req, res) {
    var paramObj = {
      id: req.param('id'),
      type: req.param('type'),
      sensorId: req.param('sensorId')
    };

    OnGoingDataCollection.query('SELECT DataCollectionTime, DataCollectionValue FROM ongoingdatacollection WHERE InformationTypeId=' + paramObj.type + ' AND TrackSessionConfigurationId=' + paramObj.id + ' AND sensorN=' + paramObj.sensorId + ' ORDER BY DataCollectionTime;', function (err, results) {
      var result = [];
      var sumTime = 0;
      var sumValue1 = 0;

      var i = 1;
      var xyz = [];
      if (paramObj.type == 1) { //GPS
        result = results;
      } else if (paramObj.type == 2 || paramObj.type == 3 || paramObj.type == 4) { //Accelerometer //Gyroscope //Compass
        var sumX = 0;
        var sumY = 0;
        var sumZ = 0;
        var j = 0;

        results.forEach(function (d) {
          xyz = d["DataCollectionValue"].split(',');
          sumX += parseFloat(xyz[0]);
          sumY += parseFloat(xyz[1]);
          sumZ += parseFloat(xyz[2]);
          j++;
        });

        var math = require('mathjs');

        var a = math.matrix([sumX / j, sumY / j, sumZ / j]);
        //var a = math.matrix([2, 1, 0]);
        //var a = math.matrix([0, 0, 1]);

        var norm = math.sqrt(math.pow(a.subset(math.index(0)), 2) + math.pow(a.subset(math.index(1)), 2) + math.pow(a.subset(math.index(2)), 2));

        var a = math.matrix([a.subset(math.index(0)) / norm, a.subset(math.index(1)) / norm, a.subset(math.index(2)) / norm]);

        var b = math.matrix([0, 1, 0]);

        var Fi = math.transpose(math.matrix([a, math.transpose(math.divide(math.subtract(b, math.multiply(math.dot(a, b), a)), math.norm(math.subtract(b, math.multiply(math.dot(a, b), a))))), math.cross(b, a)]));
        var G = math.matrix([[math.dot(a, b), -math.norm(math.cross(a, b)), 0],
          [math.norm(math.cross(a, b)), math.dot(a, b), 0],
          [0, 0, 1]]);
        var U = math.multiply(Fi, math.multiply(G, math.inv(Fi)));

        var vectorT;
        results.forEach(function (d) {
          xyz = d["DataCollectionValue"].split(',');
          vectorT = math.multiply(U, math.matrix([parseFloat(xyz[0]), parseFloat(xyz[1]), parseFloat(xyz[2])]));

          result.push({
            'j': j,
            'sumX': sumX / j,
            'sumY': sumY / j,
            'sumZ': sumZ / j,
            'bX': b.subset(math.index(0)),
            'bY': b.subset(math.index(1)),
            'bZ': b.subset(math.index(2)),

            'DataCollectionTime': d["DataCollectionTime"],
            'DataCollectionValue': vectorT.subset(math.index(0)).toFixed(2) + ',' + vectorT.subset(math.index(1)).toFixed(2) + ',' + vectorT.subset(math.index(2)).toFixed(2)
            //'DataCollectionValue': vectorT.subset(math.index(0)) + ',' + vectorT.subset(math.index(1)) + ',' + vectorT.subset(math.index(2))
          });
          i++;
        });
      } else if (paramObj.type == 5) { //Temperature
        results.forEach(function (d) {
          sumTime += d["DataCollectionTime"];
          sumValue1 += parseInt(d["DataCollectionValue"]);
          if (i % 10 == 0 || i == results.length) {
            result.push({'DataCollectionTime': sumTime / i, 'DataCollectionValue': sumValue1 / i});
            sumTime = 0;
            sumValue1 = 0;
          }
          i++;
        });
      }
      res.json(result);
    });
  },

  getList: function (req, res) {
    var paramObj = {
      userId: req.param('userId')
    };
    OnGoingDataCollection.query('SELECT DISTINCT(TrackSessionConfigurationId) FROM ongoingdatacollection ORDER BY TrackSessionConfigurationId;', function (err, results) {
      res.json(results);
    });
  },

  getListSensor: function (req, res) {
    var paramObj = {
      userId: req.param('userId'),
      trackSessionId: req.param('trackSessionId')
    };
    OnGoingDataCollection.query('SELECT DISTINCT(sensorN) FROM ongoingdatacollection WHERE TrackSessionConfigurationId=' + paramObj.trackSessionId + ' ORDER BY sensorN;', function (err, results) {
      res.json(results);
    });
  }
};

function socketinteraction(paramObj, sensorFlags) {

  var io = sails.io;

  var sp = require("serialport");
  var SerialPort = sp.SerialPort;

  var serialPortOptions = {
    baudrate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false,
    parser: sp.parsers.raw
  };

  var Parser = require("./TramasController");

  var newBuffer = new Buffer(56);
  var fof = new Buffer([0xff, 0x00, 0xff]);
  var off = new Buffer([0x00, 0xff, 0xff]);

  /*sp.list(function (err, ports) {
   //listSerialPorts.push(ports);
   //console.log(ports);
   ports.forEach(function (port) {
   listSerialPorts.push(port.comName);
   console.log(port.comName);
   console.log(port.pnpId);
   console.log(port.manufacturer);
   });
   });
   */
  /*
   sp.list(function (err, ports) {
   ports.forEach(function (port) {
   console.log("XX: " + port.comName);
   });

   global.serialPort = new SerialPort(paramObj.portCom, serialPortOptions, false);

   if (global.serialPort.isOpen()) {
   global.serialPort.close();
   } else {
   console.log("global.serialPort.isOpen()1: " + global.serialPort.isOpen());
   }

   global.serialPort.open(function (error) {
   console.log("global.serialPort.isOpen()2: " + global.serialPort.isOpen());

   if (error) {
   console.log('failed to open: ' + error);
   }
   console.log("DATA1");
   global.serialPort.on("data", function (data) {
   console.log("DATA");
   newBuffer = Buffer.concat([newBuffer, data]);
   });
   global.serialPort.on('error', function (err) {
   console.error("error", err);
   });
   });
   });
   */

  global.serialPort = new SerialPort(paramObj.portCom, serialPortOptions);

  if (global.serialPort.isOpen()) {
    global.serialPort.close();
  } else {
    console.log("global.serialPort.isOpen()1: " + global.serialPort.isOpen());
  }

  global.serialPort.on("open", function () {
    global.serialPort.on('data', function (data) {

      newBuffer = Buffer.concat([newBuffer, data]);
    });

    global.serialPort.on('error', function (err) {
      console.error("error", err);
    });
  });

  io.sockets.on('connection', function (socket) {
    socket.on('addSensor', function () {
      socket.join("room");
    });

    socket.on('disconnect', function () {
      socket.leave("room");
      console.log("EXIT");
      //global.serialPort.on('close', function (err) {
      global.serialPort.close();
      //console.log('port closed', err);
      //});
    });

    var countFor;
    setInterval(function () {
      for (countFor = 0; countFor < 10; countFor++) {

        if (newBuffer.slice(0, 3).equals(fof) && newBuffer.length > 3) {
          var size = newBuffer.slice(3, 4).readInt8(0, 0);
          //console.log("SIZE: " + size);
          if (newBuffer.length >= size) {

            //console.log(newBuffer);
            //console.log(newBuffer.slice(size - 3, size));
            //console.log(size);
            if (newBuffer.slice(size - 3, size).equals(off)) {
              //console.log("TESTE1");
              var parserTramas = Parser.parse(newBuffer.slice(0, size), sensorFlags, size);
              //console.log("TESTE2");
              if (parserTramas.type == 0) { // GPS
                console.log("GPS");
              } else if (parserTramas.type == 1) { // Motion
                //console.log("MOTION");
                //console.log(parserTramas.result);

                if(paramObj.flagSave){
                  //SAVE
                  //parserTramas.result
                }

                socket.emit('updatechart', parserTramas.result);
              } else { // Other
                console.log("OTHER");
              }

              newBuffer = newBuffer.slice(size, newBuffer.length);
            } else {
              //console.log("\033[31m################# PROBLEMAS1 #################\033[0m");
              while (!newBuffer.slice(1, 4).equals(fof)) {
                newBuffer = newBuffer.slice(2, newBuffer.length);
                if (newBuffer.length < 4) {
                  break;
                }
              }
            }
          }
        } else { // Descartar bytes "desconhecidos"
          while (!newBuffer.slice(0, 3).equals(fof)) {
            if (newBuffer.length < 4) {
              break;
            }
            newBuffer = newBuffer.slice(1, newBuffer.length);
          }
        }
      }
    }, 100);
  });
}

function getListSerialPort() {
  var sp = require("serialport");

  var list = [];

  sp.list(function (err, ports) {
    ports.forEach(function (port) {
      console.log("XX: " + port.comName);
      list.push(port.comName);
    });
  });
  return list;
}
