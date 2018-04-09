package editor

import react.RBuilder
import react.RComponent
import react.RProps
import react.RState
import react.dom.div
import react.dom.findDOMNode
import react.setState
import AceAjax.Ace
import AceAjax.Editor
import org.w3c.dom.HTMLElement


external var ace: Ace = definedExternally

interface AceProps : RProps {
    var mode: String
    var initialText: String
    var fontSize: Number
}

interface AceState : RState {
    var text: String
}

class AceEditor(props: AceProps) : RComponent<AceProps, AceState>(props) {
    override fun AceState.init(props: AceProps) {
        text = props.initialText
    }

    private fun handleChange(newText: String, event: Any?) {
        setState {
            text = newText
        }
    }

    override fun componentDidMount() {
        val root: HTMLElement = findDOMNode(this) as HTMLElement
        val editor: Editor = ace.edit(root)
        editor.setTheme("ace/theme/github")
        editor.setFontSize(props.fontSize.toString())
        editor.setHighlightActiveLine(true)
        editor.setShowPrintMargin(false)
        editor.`$blockScrolling` = Double.POSITIVE_INFINITY
        editor.setOption("maxLines", Double.POSITIVE_INFINITY)
        editor.getSession().setMode(props.mode)
    }

    override fun RBuilder.render() {
        div("root") {
            +state.text
        }
    }
}

fun RBuilder.ace(mode: String = "text", initialText: String = "", fontSize: Number = 14) = child(AceEditor::class) {
    attrs.mode = mode
    attrs.initialText = initialText
    attrs.fontSize = fontSize
}