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

exports.findBook = function(req, res) {
  Storybook.findOne({bookName: req.body.bookName}, function(err, storybook) {
    res.send(storybook);
  });
};

exports.editBook = function(req, res) {
  Storybook.findByIdAndUpdate(req.body.bookId, {
      bookName: req.body.book.bookName,
      numPages: req.body.book.numPages,
      pages: req.body.book.pages
    }, function(err, res) {
    console.log(res);
  });
};

exports.listBooks = function(req, res) {
  Storybook.find({}, function(err, storybooks){
    res.send(storybooks);
  });
};
