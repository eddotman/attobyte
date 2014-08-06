'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StorybookSchema = new Schema({
  bookName: String,
  numPages: {
    type: Number,
    set: function (v) { return Math.round(v); }
  },
  pages: [
    {
      story: [String],
      question: [String],
      answer: [String]
    }
  ]
});

mongoose.model('Storybook', StorybookSchema);
