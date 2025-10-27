import type { languages } from "monaco-editor"
import rawInstructions from "../data/instructions"
import i18n from "../data/locale"
import type { suggestionFunction } from "."

const cachedInstructions: {
	cache: Map<string, Omit<languages.CompletionItem, "range">>
	locale: string
} = {
	cache: new Map(),
	locale: "",
}

const getInstructions: suggestionFunction = ({ range, snippets, lineContent }) => {
	if (lineContent.trim() !== "" && !/^\s*[a-z]*$/.test(lineContent.trim())) return
	if (cachedInstructions.locale !== i18n.language) generateInstructions()
	for (const item of cachedInstructions.cache.values()) snippets.push({ ...item, range })
}

const generateInstructions = (): void => {
	cachedInstructions.cache.clear()
	for (let i = 0; i < rawInstructions.length; i++) {
		const ins = rawInstructions[i]
		if (!ins || ins.name.length === 0) continue
		cachedInstructions.cache.set(ins.name, {
			label: ins.name,
			kind: 3, // languages.CompletionItemKind.Function,
			insertText: `${ins.name} ${ins.snippet}`.trim(),
			insertTextRules: 4, // languages.CompletionItemInsertTextRule.InsertAsSnippet,
			detail: ins.preview.toString(),
			documentation: i18n.t(ins.name) || undefined,
			tags: ins.deprecated ? [1] : [], // languages.CompletionItemTag.Deprecated
		})
	}
	cachedInstructions.locale = i18n.language
}
export default getInstructions
