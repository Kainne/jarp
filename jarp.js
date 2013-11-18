#!/usr/bin/env node

var argv = require('optimist')
  .usage('Translates Java to C#.\nUsage: $0')
  .demand('f')
  .alias('f', 'file')
  .describe('f', 'File to translate')
  .argv;

var fs = require('fs'),
  readline = require('readline');

var rd = readline.createInterface({
  input: fs.createReadStream(argv.file),
  output: process.stdout,
  terminal: false
});

var regen = function(word) {
  var nonalphanum = '([^\w\d])';
  word = word.replace(/\./, '\.');
  return new RegExp(nonalphanum + word + nonalphanum);
};

var swap = function(line, oldword, newword) {
  return line.replace(regen(oldword), '$1' + newword + '$2');
};

var jarp = function(line) {
  line = swap(line, 'main', 'Main');
  line = swap(line, 'String', 'string');
  line = swap(line, 'out.println', 'Console.WriteLine');
  return line;
};

rd.on('line', function(line) {
  console.log( jarp(line) );
});

