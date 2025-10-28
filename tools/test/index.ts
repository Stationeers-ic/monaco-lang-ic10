import * as monaco from "monaco-editor"
import { registerLanguage } from "../../src"

// Monaco editor is loaded via AMD in index.html
// declare const monaco: typeof import("monaco-editor");

const value = `
# Label tests (labels end the statement)
start:
loop:

# define keyword
define MY_CONSTANT 42
define ANOTHER_VALUE 100

# alias keyword
alias myAlias someValue
alias tempVar anotherValue

# jump (j) keyword
j start
j loop

# Regular instructions (from @instructions)
move r0 1
add r1 r2 r3
add r1 r2 r3
add r1 -100 $20
add r1 %1111 3.14
sub r4 r5 r6
sub r4 -50 $AB
sub r4 %0101 -1.5
mul r7 r8 r9
mul r7 -25 $FF
mul r7 %1001 2.5
div r10 r11 r12
div r10 -80 $40
div r10 %1100 -3.5

# Complex cases with comments
move r0 LogicType.Channel0 # LogicType integer
move r14 0 # seed;hello;
move d11: 0 # seed:;

# Your existing test cases
# place the values in r0 to r7
move r15 LogicType.Channel0 #LogicType integer
move r14 0 #seed;hello;
move d11: 0 #seed:;
loop:
#debug:r0; #del:r0;
#log:"Channel 0 value is ", r0;
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

// const breakpoints = new Map<number, monaco.editor.IEditorDecorationsCollection>()

// // Helper to apply or remove decoration
// function toggleBreakpoint(lineNumber: number) {
// 	if (breakpoints.has(lineNumber)) {
// 		breakpoints.get(lineNumber)!.clear() // remove
// 		breakpoints.delete(lineNumber)
// 	} else {
// 		const collection = editor.createDecorationsCollection([
// 			{
// 				range: new monaco.Range(lineNumber, 1, lineNumber, 1),
// 				options: {
// 					isWholeLine: true,
// 					glyphMarginClassName: "breakpoint-glyph",
// 				},
// 			},
// 		])
// 		breakpoints.set(lineNumber, collection)
// 	}
// }
// editor.onMouseDown((e) => {
// 	if (e.target.type === monaco.editor.MouseTargetType.GUTTER_GLYPH_MARGIN) {
// 		const lineNumber = e.target.position.lineNumber
// 		toggleBreakpoint(lineNumber)
// 	}
// })
