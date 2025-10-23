import * as monaco from "monaco-editor"
import { registerLanguage } from "../../src"
import { registerCompletionProvider } from "../../src/suggestions"
// Monaco editor is loaded via AMD in index.html
// declare const monaco: typeof import("monaco-editor");

const value = `function hello() {
	alert('Hello world!');
}`
registerLanguage()
registerCompletionProvider()
// Hover on each property to see its docs!
const myEditor = monaco.editor.create(document.getElementById("container")!, {
	value,
	language: "ic10",
	automaticLayout: true,
	codeLens: true,
	lineNumbers(lineNumber) {
		return `${lineNumber-1}`;
	},
})
