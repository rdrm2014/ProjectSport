/**
 * statusController
 *
 * @description ::
 * @help        ::
 */

var sp = require("serialport");
var SerialPort = sp.SerialPort;

module.exports = {

  indexv1: function (req, res) {
    var listSerialPorts = [];
    //var sp = require("serialport");
    sp.list(function (err, ports) {
      ports.forEach(function (port) {
        console.log(port.comName);
        listSerialPorts.push({comName: port.comName, pnpId: port.pnpId, manufacturer: port.manufacturer});
      });

      res.view({
        title: 'Status',
        listSerialPorts: listSerialPorts
      });
    });
  },
  indexv2: function (req, res) {
    var listSerialPorts = [];
    //var sp = require("serialport");
    sp.list(function (err, ports) {
      ports.forEach(function (port) {
        console.log(port.comName);
        listSerialPorts.push({comName: port.comName, pnpId: port.pnpId, manufacturer: port.manufacturer});
      });

      res.view({
        title: 'Status',
        listSerialPorts: listSerialPorts
      });
    });
  },

  indexv3: function (req, res) {
    var listSerialPorts = [];
    //var sp = require("serialport");
    sp.list(function (err, ports) {
      ports.forEach(function (port) {
        console.log(port.comName);
        listSerialPorts.push({comName: port.comName, pnpId: port.pnpId, manufacturer: port.manufacturer});
      });

      res.view({
        title: 'Status',
        listSerialPorts: listSerialPorts
      });
    });
  },

  indexv4: function (req, res) { //Horrivel
    var listSerialPorts = [];
    //var sp = require("serialport");
    sp.list(function (err, ports) {
      ports.forEach(function (port) {
        console.log(port.comName);
        listSerialPorts.push({comName: port.comName, pnpId: port.pnpId, manufacturer: port.manufacturer});
      });

      res.view({
        title: 'Status',
        listSerialPorts: listSerialPorts
      });
    });
  },


  index: function (req, res) {
    var listSerialPorts = [];
    //var sp = require("serialport");
    sp.list(function (err, ports) {
      ports.forEach(function (port) {
        console.log(port.comName);
        listSerialPorts.push({comName: port.comName, pnpId: port.pnpId, manufacturer: port.manufacturer});
      });

      res.view({
        title: 'Start Configuration',
        listSerialPorts: listSerialPorts
      });
    });
  },

  getAllInformation: function (req, res) {
    var paramObj = {
      portCom: req.param('portCom'),
      comName: req.param('comName'),
      pnpId: req.param('pnpId'),
      manufacturer: req.param('manufacturer')
    };

    console.log(JSON.stringify(paramObj));
    var serialPortOptions = {
      baudrate: 9600,
      dataBits: 8,
      parity: 'none',
      stopBits: 1,
      flowControl: false,
      parser: sp.parsers.readline("\r\n")
    };

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
        global.serialPort.write("#CON ALL\n", function (err, chars) {
          global.serialPort.on("data", function (data) {
            res.json(data);
            console.log("" + data);
            console.log("global.serialPort.close()");
            global.serialPort.close();
          });
        });
      });
    });
  },

  update: function (req, res) {
    console.log(req.body.listSensors);

    var x = JSON.parse(req.body.listSensors);
    Object.size = function (obj) {
      var size = 0, key;
      for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
      }
      return size;
    };
    if (global.serialPort.isOpen()) {
      global.serialPort.close();
    } else {
      console.log("global.serialPort.isOpen()3: " + global.serialPort.isOpen());
    }

    global.serialPort.open(function (error) {
      console.log("global.serialPort.isOpen()4: " + global.serialPort.isOpen());

      if (error) {
        console.log('failed to open: ' + error);
      } else {
        var str = "";
        for (var y in x) {
          for (var z in x[y].listPeers) {
            if (x[y].listPeers[z].listConf) {
              for (var q in x[y].listPeers[z].listConf) {
                for (var w in x[y].listPeers[z].listConf[q]) {
                  str += "#CON " + x[y].listPeers[z].idPeer + "." + w + "=" + x[y].listPeers[z].listConf[q][w] + "\n";
                }
              }
            } else if (x[y].listPeers[z].type) {
              //console.log(x[y].listPeers[z]);
              //console.log(x[y].listPeers[z].type);
              str += "#CON " + x[y].listPeers[z].idPeer + ".type=" + x[y].listPeers[z].type + "\n";
            }
          }
        }
        console.log(str);
        global.serialPort.write(str, function () {
          global.serialPort.drain(function (error) {
            console.log("DRAIN: " + error);
          });
        });
        global.serialPort.close();
      }
    });

    res.redirect('/status');
  }
};
