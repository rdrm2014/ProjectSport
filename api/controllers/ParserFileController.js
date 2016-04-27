/**
 * ParserFileController
 *
 * @description :: Server-side logic for managing Trainers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var fs = require('fs');

module.exports = {

  parser: function(req, res) {
    var paramObj = {
      //File: req.param('userFile')
      file: req.file('userFile')
    };
    console.log(paramObj);

    paramObj.file.upload(function onUploadComplete (err, files) {
      //	Files will be uploaded to .tmp/uploads

      if (err) return res.serverError(err);
      //	IF ERROR Return and send 500 error with error

      console.log(files);

      console.log("TETT");
      console.log("" + files[0].fd);
      console.log("TETT");

      fs.readFile(files[0].fd, "utf8",  function (err,data) {
        if (err) {
          return console.log(err);
        }

        /* Parse *
        var size = data.slice(3, 4).readInt8(0, 0);
        var Parser = require("TramasController");
        var parserTramas = Parser.parse(data.slice(0, size));

        if (parserTramas.type == 0) { // GPS
          console.log("GPS");
        } else if (parserTramas.type == 1) { // Motion
          console.log("~MOTION");
          parserTramas.result;
        } else { // Other
          console.log("OTHER");
        }
        /* Parse */

        console.log(data);
        //res.json({status:200,file:files});
        res.json({teste: data});
      });

    });
    /*
    var input = fs.readFile(paramObj.file.path, function (err, data) {
        console.log(data);
      var remaining = '';

      input.on('data', function (data) {
        remaining += data;
        var index = remaining.indexOf('\n');
        while (index > -1) {
          var line = remaining.substring(0, index);
          remaining = remaining.substring(index + 1);
          func(line);
          index = remaining.indexOf('\n');
        }
      });

      input.on('end', function () {
        if (remaining.length > 0) {
          func(remaining);
        }
      });
    });
    */
  },

  index: function(req, res) {
      res.view();
  }
};

/*function func(data) {

  var types = ['GPS', 'MAC', 'MGY', 'MCO', 'TEM'];
  var results = [];

  var trama = data.split('|');
  var sensorN = parseInt(trama[0].replace('#',''));
  var arrT = trama[1].split(':');

  var arr = arrT[1].split(',');
  var typeNum = types.indexOf(arrT[0]) + 1;
  if (typeNum != 0) {
    if (arrT[0] == 'GPS') {
      if (arr[2] != '' && arr[3] != '' && arr[4] != '' && arr[5] != '') {
        //GPS
        var lonlat = arr[0] + ', ' + arr[1];
        results.push({
          'sensorN': sensorN,
          'TrackSessionConfigurationId': trackSession,
          InformationTypeId: typeNum,
          'DataCollectionTime': parseInt(arr[15].replace(/(\r\n|\n|\r)/gm, '')),
          'DataCollectionValue': lonlat
        });
        ignore = false;
      }
    } else if (arrT[0] == 'TEM') {
      results.push({
        'sensorN': sensorN,
        'TrackSessionConfigurationId': trackSession,
        InformationTypeId: typeNum,
        //'DataCollectionTime': time,
        'DataCollectionTime': parseInt(arr[1].replace(/(\r\n|\n|\r)/gm, '')),
        'DataCollectionValue': arr[0]
      });
    } else if (arrT[0] == 'MAC') {
      results.push({
        'sensorN': sensorN,
        'TrackSessionConfigurationId': trackSession,
        InformationTypeId: typeNum,
        //'DataCollectionTime': time,
        'DataCollectionTime': parseInt(arr[3].replace(/(\r\n|\n|\r)/gm, '')),
        'DataCollectionValue': (arr[0]*32/65535 - 16) + ', ' + (arr[1]*32/65535 - 16) + ', ' + (arr[2]*32/65535 - 16)
      });
    } else {
      results.push({
        'sensorN': sensorN,
        'TrackSessionConfigurationId': trackSession,
        InformationTypeId: typeNum,
        //'DataCollectionTime': time,
        'DataCollectionTime': parseInt(arr[3].replace(/(\r\n|\n|\r)/gm, '')),
        'DataCollectionValue': arr[0] + ', ' + arr[1] + ', ' + arr[2]
      });
    }

    for (i = 0; i < results.length; i++) {
      options.qs = results[i];
      request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body + "TESTE:" + data)
        }
      });
    }
    testeStop = false;
  }
}*/
