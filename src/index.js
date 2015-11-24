'use strict';

let express = require('express');
let app = new express();
let config = require('config');
let favicon = require('serve-favicon');

app.use(express.static('public'));
app.use(favicon(__dirname + '/../public/favicon.ico'));

app.listen(config.port, function() {
  console.log('glut-api started on port ' + config.port);
});
