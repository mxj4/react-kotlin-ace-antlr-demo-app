package index

import app.*
import kotlinext.js.*
import react.dom.*
import kotlin.browser.*

fun main(args: Array<String>) {
    requireAll(require.context("src", true, js("/\\.css$/")))
    require("brace")
    require("brace/ext/searchbox")
    require("brace/theme/github")
    require("brace/mode/json")
    require("brace/mode/text")
    require("antlr4")
    require("antlr4/index")
    require("antlr4-ace-ext/src/token-type-map.js")
    require("antlr4-ace-ext/src/tokenizer.js")
    require("src/editor/simple-boolean-mode.js")
    render(document.getElementById("root")) {
        app()
    }
}
