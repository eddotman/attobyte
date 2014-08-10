'use strict';

var mongoose = require('mongoose');
var Storybook = mongoose.model('Storybook');

exports.writeBook = function(req, res) {
  var sb = new Storybook(req.body);
  sb.save(); //TODO error checking
  res.end('Book successfully created');
};

exports.readBook = function(req, res) {
  Storybook.findOne({name: req.bookName});
};
