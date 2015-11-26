'use strict';

let express = require('express');
let app = new express();
let config = require('config');
let favicon = require('serve-favicon');

app.use(express.static('public'));
app.use(favicon(__dirname + '/../public/favicon.ico'));

app.get('/config', function(req, res) {
  var publicConfig = {
    athu: {
      baseUrl: config.athu.baseUrl
    },
    api: {
      baseUrl: config.api.baseUrl
    }
  };
  res.json(publicConfig);
});

app.listen(config.port, function() {
  console.log('glut-admin started on port ' + config.port);
});
