#!/usr/bin/env node

var argv = require('optimist')
  .usage('Translates Java to C#')
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
  var nonalphanum = '([^\w\d]|^)';
  word = word.replace(/\./, '\.');
  word = word.replace(/\*/, '\*');
  return new RegExp(nonalphanum + word + nonalphanum);
};

var swap = function(line, oldword, newword) {
  return line.replace(regen(oldword), '$1' + newword + '$2');
};

var jarp = function(line) {
  line = swap(line, 'main', 'Main');
  line = swap(line, 'import', 'using');
  line = swap(line, 'java.util.*', 'System');
  line = swap(line, 'extends', ':');
  line = swap(line, 'implements', ':');

  // data types
  line = swap(line, 'String', 'string');
  line = swap(line, 'boolean', 'bool');
  line = swap(line, 'Object', 'object');

  // common functions
  line = swap(line, 'out.println', 'Console.WriteLine');
  line = swap(line, 'out.print', 'Console.Write');
  line = swap(line, 'toString', 'ToString');
  line = swap(line, 'Integer.parseInt', 'int.Parse');
  line = swap(line, 'equals', 'Equals');
  line = swap(line, 'compareTo', 'CompareTo');
  line = swap(line, 'substring', 'Substring');

  // constants
  line = swap(line, 'final', 'readonly');

  return line;
};

rd.on('line', function(line) {
  console.log(jarp(line));
});

