import * as monaco from "monaco-editor"
import { registerLanguage } from "../../src"
import { registerCompletionProvider } from "../../src/suggestions"
// Monaco editor is loaded via AMD in index.html
// declare const monaco: typeof import("monaco-editor");

const value = `
# IC10 Example: All Types in One
# seed:12345678
# hello seed:12345 ads
 alias dSensor d0           # device alias
 alias dDisplay $aff23          # another device
alias vTemp %1010_1011             # register alias for variable
define THRESHOLD -29.58       # constant definition

l vTemp dSensor Temperature # read temperature from sensor
bgt vTemp THRESHOLD hot     # branch if temp > threshold
move r1 -0
s dDisplay Setting r1       # set display to OFF
j end

 hot:
move r1 1
s dDisplay Setting r1       # set display ON
lbn rr2 dr2 HASH("StructureGasSensor") HASH("Sensor 1") Pressure Average
s db Setting r2             # output value to IC housing
yield

end:
sleep 1
`
registerLanguage()
registerCompletionProvider()

//     var tmThemeString = https://raw.githubusercontent.com/brijeshb42/monaco-themes/refs/heads/master/themes/Monokai.json
//     var themeData = MonacoThemes.parseTmTheme(tmThemeString)
// monaco.editor.defineTheme('mytheme', themeData)
// monaco.editor.setTheme('mytheme')

fetch("/monokai.json")
	.then(data => data.json())
	.then(data => {
		monaco.editor.defineTheme('monokai', data)
		monaco.editor.setTheme('monokai')
	})



const myEditor = monaco.editor.create(document.getElementById("container")!, {
	value,
	language: "ic10",
	automaticLayout: true,
	codeLens: true,
	theme: "vs-dark",
	lineNumbers(lineNumber) {
		return `${lineNumber - 1}`
	},
})
