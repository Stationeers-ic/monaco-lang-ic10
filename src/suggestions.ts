import { languages } from "monaco-editor"
import rawInstructions from "./data/instructions"


const instructions: Omit<languages.CompletionItem, "range">[] = []
for (let i = 0; i < rawInstructions.length; i++) {
	const ins = rawInstructions[i]
	if (!ins || ins.name.length === 0) continue
	instructions.push({
		label: ins.name,
		kind: languages.CompletionItemKind.Keyword,
		insertText: `${ins.name} ${ins.snippet}`.trim(),
		insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
		documentation: ins.description || undefined,
		tags: ins.deprecated ? [languages.CompletionItemTag.Deprecated] : [],
	})
}
console.log(instructions.map((x)=> x.insertText).join("\n"));
export function registerCompletionProvider(languageId: string = "ic10") {
	languages.registerCompletionItemProvider(languageId, {
		provideCompletionItems: (model, position) => {
			// Get the current word until cursor position to define replacement range
			const word = model.getWordUntilPosition(position)
			const lineContent = model.getLineContent(position.lineNumber).substring(0, position.column - 1);
			const range = {
				startLineNumber: position.lineNumber,
				endLineNumber: position.lineNumber,
				startColumn: word.startColumn,
				endColumn: word.endColumn,
			}
			console.log(lineContent);
			// Define suggestions with labels, kinds, inserted texts, and ranges
			const suggestions = [
				{
					label: 'console.log',
					kind: languages.CompletionItemKind.Function,
					insertText: 'console.log(${1:message})',
					insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
					range,
					documentation: 'Log output to console',
				},
				{
					label: 'function',
					kind: languages.CompletionItemKind.Keyword,
					insertText: 'function ${1:name}() {\n\t$0\n}',
					insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
					range,
					documentation: 'Function keyword snippet',
				},
				...instructions.map(item => ({ ...item, range })),
			]

			return { suggestions }
		},
	})
}
