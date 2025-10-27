import type { languages } from "monaco-editor"
import type { suggestionFunction } from "."

const debugFunctions = [
	{
		label: "seed",
		argumentless: false,
		snippet: "#seed:${1:0};${0}",
		preview: "#seed:0;",
		deprecated: false,
	},
	{
		label: "debug",
		argumentless: false,
		snippet: "#debug:${1:r0};${0}",
		preview: "#debug:r0;",
		deprecated: false,
	},
]

const cachedDebug: Map<string, Omit<languages.CompletionItem, "range">> = new Map()

const getDebug: suggestionFunction = ({ range, snippets, lineContent }) => {
	// /#\w+$/
	if (!/#.*$/.test(lineContent.trim())) return
	if (cachedDebug.size === 0) generateDebug()
	for (const item of cachedDebug.values()) snippets.push({ ...item, range })
}

const generateDebug = (): void => {
	cachedDebug.clear()
	for (let i = 0; i < debugFunctions.length; i++) {
		const ins = debugFunctions[i]
		if (!ins || ins.label.length === 0) continue
		cachedDebug.set(ins.label, {
			label: ins.label,
			kind: 3, // languages.CompletionItemKind.Function,
			insertText: ins.snippet,
			insertTextRules: 4, // languages.CompletionItemInsertTextRule.InsertAsSnippet,
			detail: ins.preview,
			documentation: undefined,
			tags: ins.deprecated ? [1] : [], // languages.CompletionItemTag.Deprecated
		})
	}
}
export default getDebug
