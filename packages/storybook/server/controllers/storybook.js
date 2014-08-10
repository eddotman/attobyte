'use strict';

var mongoose = require('mongoose');
var Storybook = mongoose.model('Storybook');

exports.writeBook = function(req, res) {
  var sb = new Storybook(req.body);
  sb.save(); //TODO error checking
  res.end('Book successfully created');
};

exports.viewBook = function(req, res) {
  Storybook.findById(mongoose.Types.ObjectId(req.body.bookId), function(err, storybook){
    res.send(storybook);
  });
};

exports.listBooks = function(req, res) {
  Storybook.find({}, function(err, storybooks){
    res.send(storybooks);
  });
};
