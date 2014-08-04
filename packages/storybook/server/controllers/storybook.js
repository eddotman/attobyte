'use strict';

var mongoose = require('mongoose');
var Storybook = mongoose.model('Storybook');

exports.writeBook = function(req, res) {
  var sb = new Storybook();
  sb.name = 'test';
  sb.save();
  res.end('DERP');
};
