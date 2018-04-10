importScripts("ace/worker-json.js");


ace.define(
  'ace/worker/simple-boolean',
  [
    'require', 'exports', 'module',
    'ace/lib/oop',
    'ace/worker/mirror'
  ], function(acequire, exports, module) {
    'use strict';

    var oop = acequire('ace/lib/oop');
    var Mirror = acequire('ace/worker/mirror').Mirror;

    var SimpleBooleanWorker = function(sender) {
      Mirror.call(this, sender);
      this.setTimeout(200);
      this.$dialect = null;
    };

    oop.inherits(SimpleBooleanWorker, Mirror);

    // load nodejs compatible require.
    window.require = undefined; // prevent error: "Honey: 'require' already defined in global scope"
    importScripts('require.js');
    var antlr4_require = window.require;

    // load antlr4 and SimpleBoolean lexer/parser
    var antlr4 = antlr4_require('antlr4/index');
    var SimpleBooleanLexer = antlr4_require('parser/SimpleBooleanLexer.js').SimpleBooleanLexer;
    var SimpleBooleanParser = antlr4_require('parser/SimpleBooleanParser.js').SimpleBooleanParser;

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
      parser.parse();
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