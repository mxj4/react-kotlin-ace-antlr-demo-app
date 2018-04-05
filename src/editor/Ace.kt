package editor

import AceEditorProps
import react.RBuilder
import react.RClass
import react.RComponent
import react.RProps
import react.RState
import react.setState

// FIXME how to import js module with export default through @JsModule ?
val reactAce: RClass<AceEditorProps> = js("require(\"react-ace\").default")

interface AceProps : RProps {
    var mode: String
    var initialText: String
    var fontSize: Number
}

interface AceState : RState {
    var text: String
}

class Ace(props: AceProps) : RComponent<AceProps, AceState>(props) {
    override fun AceState.init(props: AceProps) {
        text = props.initialText
    }

    private fun handleChange(newText: String, event: Any?) {
        setState {
            text = newText
        }
    }

    override fun RBuilder.render() {
        reactAce {
            attrs {
                mode = props.mode
                fontSize = props.fontSize
                theme = "github"
                showGutter = true
                showPrintMargin = false
                highlightActiveLine = true

                value = state.text

                onChange = ::handleChange
            }
        }
    }
}

fun RBuilder.ace(mode: String = "text", initialText: String = "", fontSize: Number = 14) = child(Ace::class) {
    attrs.mode = mode
    attrs.initialText = initialText
    attrs.fontSize = fontSize
}