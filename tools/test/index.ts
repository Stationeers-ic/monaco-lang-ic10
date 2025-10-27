import * as monaco from "monaco-editor"
import { registerLanguage } from "../../src"

// Monaco editor is loaded via AMD in index.html
// declare const monaco: typeof import("monaco-editor");

const value = `
#read all 8 channels with a loop and
#place the values in r0 to r7
move r15 LogicType.Channel0 #LogicType integer
move r14 0 # seed:10
loop:
l rr14 db:0 r15
add r15 r15 1 #next channel
add r14 r14 1 #next register
ble r15 LogicType.Channel7 loop
`
registerLanguage(monaco)
// registerCompletionProvider(monaco)

//     var tmThemeString = https://raw.githubusercontent.com/brijeshb42/monaco-themes/refs/heads/master/themes/Monokai.json
//     var themeData = MonacoThemes.parseTmTheme(tmThemeString)
// monaco.editor.defineTheme('mytheme', themeData)
// monaco.editor.setTheme('mytheme')

fetch("/monokai.json")
	.then((data) => data.json())
	.then((data) => {
		monaco.editor.defineTheme("monokai", data)
		monaco.editor.setTheme("monokai")
	})

const editor = monaco.editor.create(document.getElementById("container")!, {
	value,
	language: "ic10",
	automaticLayout: true,
	codeLens: true,
	theme: "vs-dark",
	glyphMargin: true,
	
	lineNumbers(lineNumber) {
		return `${lineNumber - 1}`
	},
})

const breakpoints = new Map<number, monaco.editor.IEditorDecorationsCollection>()

// Helper to apply or remove decoration
function toggleBreakpoint(lineNumber: number) {
	if (breakpoints.has(lineNumber)) {
		breakpoints.get(lineNumber)!.clear() // remove
		breakpoints.delete(lineNumber)
	} else {
		const collection = editor.createDecorationsCollection([
			{
				range: new monaco.Range(lineNumber, 1, lineNumber, 1),
				options: {
					isWholeLine: true,
					glyphMarginClassName: "breakpoint-glyph",
				},
			},
		])
		breakpoints.set(lineNumber, collection)
	}
}
editor.onMouseDown((e) => {
	if (e.target.type === monaco.editor.MouseTargetType.GUTTER_GLYPH_MARGIN) {
		const lineNumber = e.target.position.lineNumber
		toggleBreakpoint(lineNumber)
	}
})
