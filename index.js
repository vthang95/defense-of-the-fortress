'use strict';

var express = require('express');
var fs = require('fs');
var app = express();
app.set('port', (process.env.PORT || 6969));
var http = require('http').Server(app);
app.use(express.static(__dirname));

http.listen(app.get('port'), function(){
  console.log('Server started. Listening on *:6969');
});
