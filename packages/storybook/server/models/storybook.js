'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StorybookSchema = new Schema({
  name: String,
  pictures: [String],
  questions: [String],
  answers: [String]
});

mongoose.model('Storybook', StorybookSchema);
