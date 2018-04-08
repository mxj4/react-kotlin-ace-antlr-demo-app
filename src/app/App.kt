package app

import editor.ace
import logo.logo
import react.RBuilder
import react.RComponent
import react.RProps
import react.RState
import react.dom.code
import react.dom.div
import react.dom.h2
import react.dom.h3
import react.dom.p
import ticker.ticker

class App : RComponent<RProps, RState>() {
    override fun RBuilder.render() {
        div("App-header") {
            logo()
            h2 {
                +"Welcome to React with Kotlin"
            }
        }
        div("App-editor") {
            div("left-editor") {
                h3 { +"SimpleBoolean Editor" }
                ace("simple-boolean", "")
            }
            div ("right-editor") {
                h3 { +"JSON Editor" }
                ace("json", "{\n  \"a\": \"A\",\n  \"b\": \"B\"\n}\n")
            }
        }
        p("App-intro") {
            +"To get started, edit "
            code { +"app/App.kt" }
            +" and save to reload."
        }
        p("App-ticker") {
            ticker()
        }
    }
}

fun RBuilder.app() = child(App::class) {}
