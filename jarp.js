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

var jarp = function(line) {
  line = line.replace(/main/, 'Main');
  line = line.replace(/String/, 'string');
  line = line.replace(/\.out\.println/, '.Console.WriteLine');
  return line;
}

rd.on('line', function(line) {
  console.log( jarp(line) );
});

