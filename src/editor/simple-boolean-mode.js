'use strict';

ace.define(
  'ace/mode/simple-boolean',
  [
    'require',
    'exports',
    'ace/lib/oop',
    'ace/mode/text',
    'ace/ext/antlr4/token-type-map',
    'ace/ext/antlr4/tokenizer',
    'ace/mode/custom_highlight_rules'
  ], function (acequire, exports) {
    var oop = acequire('ace/lib/oop');
    var TextMode = acequire('ace/mode/text').Mode;
    var CustomHighlightRules = acequire('ace/mode/custom_highlight_rules').CustomHighlightRules;
    var Mode = function Mode() {};
    oop.inherits(Mode, TextMode); // ACE's way of doing inheritance

    exports.Mode = TextMode; // eslint-disable-line no-param-reassign
  }
);

ace.define(
  'ace/mode/custom_highlight_rules',
  [
    'require',
    'exports',
    'ace/lib/oop',
    'ace/mode/text_highlight_rules'
  ], function (acequire, exports) {
    var oop = acequire('ace/lib/oop');
    var TextHighlightRules = acequire('ace/mode/text_highlight_rules').TextHighlightRules;

    var CustomHighlightRules = function CustomHighlightRules() {
      this.$rules = new TextHighlightRules().getRules(); // Use Text's rules as a base
    };

    oop.inherits(CustomHighlightRules, TextHighlightRules);

    exports.CustomHighlightRules = CustomHighlightRules;
  }
);