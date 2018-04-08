importScripts('ace-builds/src-noconflict/ace.js');
importScripts('./worker.js');
importScripts('./mirror.js');

ace.define(
  'ace/worker/simple-boolean-worker',
  [
    'require', 'exports', 'module',
    'ace/lib/oop',
    'ace/worker/mirror'
  ], function(require, exports, module) {
    'use strict';

    //require('ace-builds/src-noconflict/ace.js');

    var oop = require('ace/lib/oop');
    var Mirror = require('ace/worker/mirror').Mirror;

    var MyWorker = function(sender) {
      Mirror.call(this, sender);
      this.setTimeout(200);
      this.$dialect = null;
    };

    oop.inherits(SimpleBooleanWorker, Mirror);

    // load nodejs compatible require. See https://github.com/antlr/antlr4/blob/master/doc/ace-javascript-target.md
    var ace_require = require;
    window.require = undefined; // prevent error: "Honey: 'require' already defined in global scope"
    //var Honey = { 'requirePath': ['..'] }; // walk up to js folder, see Honey docs
    importScripts('./require.js');
    var antlr4_require = window.require;
    window.require = ace_require;

    // load antlr4 and SimpleBoolean lexer/parser
    var antlr4, SimpleBooleanLexer, SimpleBooleanParser;
    try {
      window.require = antlr4_require;
      antlr4 = antlr4_require('antlr4/index');
      SimpleBooleanLexer = antlr4_require('src/generated/SimpleBooleanLexer').SimpleBooleanLexer;
      SimpleBooleanLexer = antlr4_require('src/generated/SimpleBooleanParser').SimpleBooleanLexer;
    } finally {
      window.require = ace_require;
    }

    // class for gathering errors and posting them to ACE editor
    var AnnotatingErrorListener = function(annotations) {
      antlr4.error.ErrorListener.call(this);
      this.annotations = annotations;
      return this;
    };

    AnnotatingErrorListener.prototype = Object.create(antlr4.error.ErrorListener.prototype);
    AnnotatingErrorListener.prototype.constructor = AnnotatingErrorListener;

    AnnotatingErrorListener.prototype.syntaxError = function(recognizer, offendingSymbol, line, column, msg, e) {
      this.annotations.push({
        row: line - 1,
        column: column,
        text: msg,
        type: "error"
      });
    };

    function validate(input) {
      var stream = new antlr4.InputStream(input);
      var lexer = new SimpleBooleanLexer(stream);
      var tokens = new antlr4.CommonTokenStream(lexer);
      var parser = new SimpleBooleanParser(tokens);
      var annotations = [];
      var listener = new AnnotatingErrorListener(annotations);
      parser.removeErrorListeners();
      parser.addErrorListener(listener);
      parser.file();
      return annotations;
    }

    (function() {

      this.onUpdate = function() {
        var value = this.doc.getValue();
        var annotations = validate(value);
        this.sender.emit("annotate", annotations);
      };

    }).call(SimpleBooleanWorker.prototype);

    exports.SimpleBooleanWorker = SimpleBooleanWorker;
  }
);