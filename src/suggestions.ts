import { languages } from "monaco-editor"
import rawConstants from "./data/constants"
import rawInstructions from "./data/instructions"
import rawLogic from "./data/logic"

const instructions: Omit<languages.CompletionItem, "range">[] = []
for (let i = 0; i < rawInstructions.length; i++) {
	const ins = rawInstructions[i]
	if (!ins || ins.name.length === 0) continue
	instructions.push({
		label: ins.name,
		kind: languages.CompletionItemKind.Struct,
		insertText: `${ins.name} ${ins.snippet}`.trim(),
		insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
		documentation: ins.description || undefined,
		tags: ins.deprecated ? [languages.CompletionItemTag.Deprecated] : [],
	})
}
const variables: Omit<languages.CompletionItem, "range">[] = []
// const logic: Omit<languages.CompletionItem, "range">[] = []
for (let i = 0; i < rawLogic.length; i++) {
	const ins = rawLogic[i]
	if (!ins || ins.name.length === 0) continue
	variables.push({
		label: ins.name,
		kind: languages.CompletionItemKind.EnumMember,
		insertText: ins.name.trim(),
		insertTextRules: languages.CompletionItemInsertTextRule.None,
		documentation: ins.description || undefined,
	})
}
// const constants: Omit<languages.CompletionItem, "range">[] = []
for (let i = 0; i < rawConstants.length; i++) {
	const ins = rawConstants[i]
	if (!ins || ins.name.length === 0) continue
	variables.push({
		label: ins.name,
		kind: languages.CompletionItemKind.Enum,
		insertText: ins.name.trim(),
		insertTextRules: languages.CompletionItemInsertTextRule.None,
		documentation: ins.description || undefined,
	})
}

const seed: Omit<languages.CompletionItem, "range"> = {
	label: "seed:",
	kind: languages.CompletionItemKind.Constant,
	insertText: "seed:${0:0}",
	insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
}

// .push(...logic, ...constants)
export function registerCompletionProvider(monaco: any, languageId: string = "ic10") {
	const languagesApi = monaco.languages as typeof languages
	languagesApi.registerCompletionItemProvider(languageId, {
		provideCompletionItems: (model, position) => {
			// Get the current word until cursor position to define replacement range
			const word = model.getWordUntilPosition(position)
			const lineContent = model.getLineContent(position.lineNumber).substring(0, position.column - 1)
			const range = {
				startLineNumber: position.lineNumber,
				endLineNumber: position.lineNumber,
				startColumn: word.startColumn,
				endColumn: word.endColumn,
			}
			// Define suggestions with labels, kinds, inserted texts, and ranges
			const suggestions: languages.CompletionItem[] = []
			if (lineContent.trim() === "" || /^\s*[a-z]*$/.test(lineContent))
				suggestions.push(...instructions.map((item) => ({ ...item, range })))
			else if (!lineContent.includes("#")) suggestions.push(...variables.map((item) => ({ ...item, range })))
			else if (/#\s*]*$/.test(lineContent)) suggestions.push({ ...seed, range })
			return { suggestions }
		},
	})
}
