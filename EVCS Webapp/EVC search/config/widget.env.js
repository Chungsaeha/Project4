var fs = require('fs'),
  xml2js = require('xml2js');
var parser = new xml2js.Parser();

var widget = { }

var data = fs.readFileSync('./config/config.xml');
parser.parseString(data, function (err, result) {
  var appName = result.widget.name[0];
  widget.appName = typeof appName == "object" ? appName._ : appName;
  widget.widgetInfo = result.widget;
});

module.exports = widget;
