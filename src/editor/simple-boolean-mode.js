import './require.js'
import 'src/generated/SimpleBooleanLexer.js'

var antlr4 = require('antlr4/index');

ace.define('antlr4/index', function (require, exports, module) {
  module.exports = antlr4;
});

ace.define(
  'ace/mode/simple-boolean',
  [
    'require', 'exports', 'module',
    'ace/lib/oop',
    'ace/mode/text',
    'ace/ext/antlr4/token-type-map',
    'ace/ext/antlr4/tokenizer',
    'ace/mode/text_highlight_rules',
    'ace/worker/worker_client'
  ], function (acequire, exports, module) {

    var oop = acequire('ace/lib/oop');
    var TextMode = acequire('ace/mode/text').Mode;

    var createTokenTypeMap = acequire('ace/ext/antlr4/token-type-map').createTokenTypeMap;
    var Antlr4Tokenizer = acequire('ace/ext/antlr4/tokenizer').Antlr4Tokenizer;

    // load nodejs compatible require. See https://github.com/antlr/antlr4/blob/master/doc/ace-javascript-target.md
    /*var ace_require = require;
    window.require = undefined; // prevent error: "Honey: 'require' already defined in global scope"
    //var Honey = { 'requirePath': ['..'] }; // walk up to js folder, see Honey docs
    import('./require.js');
    var antlr4_require = window.require;
    window.require = require = ace_require;*/

    var tokenTypeMapping = require('../../SimpleBoolean.js');
    var tokenTypeToNameMap = createTokenTypeMap(tokenTypeMapping);
    var Lexer = require('src/generated/SimpleBooleanLexer.js').SimpleBooleanLexer;
    // FIXME antlr 4.7 generated code no longer compatible with antlr4-ace-ext, need to fix that module
    // Lexer.literalNames = Lexer.prototype.literalNames;
    // Lexer.symbolicNames = Lexer.prototype.symbolicNames;

    var SimpleBooleanMode = function() {
    };
    oop.inherits(SimpleBooleanMode, TextMode);

    (function() {

      this.$id = 'ace/mode/simple-boolean';

      this.getTokenizer = function() {
        if (!this.$tokenizer) {
          this.$tokenizer = new Antlr4Tokenizer(Lexer, tokenTypeToNameMap);
        }
        return this.$tokenizer;
      };

      var WorkerClient = acequire('ace/worker/worker_client').WorkerClient;
      this.createWorker = function(session) {
        this.$worker = new WorkerClient(
          ['ace'], 'ace/worker/simple-boolean-worker', 'SimpleBooleanWorker', './simple-boolean-worker.js'
        );
        this.$worker.attachToDocument(session.getDocument());

        this.$worker.on("errors", function(e) {
          session.setAnnotations(e.data);
        });

        this.$worker.on("annotate", function(e) {
          session.setAnnotations(e.data);
        });

        this.$worker.on("terminate", function() {
          session.clearAnnotations();
        });

        return this.$worker;

      };

    }).call(SimpleBooleanMode.prototype);

    exports.Mode = SimpleBooleanMode;
  }
);