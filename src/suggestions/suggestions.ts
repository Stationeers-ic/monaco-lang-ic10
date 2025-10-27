import type { editor, IRange, languages, Position } from "monaco-editor"

import type { CompletionItems, SuggestionArgs } from "."
import getDebug from "./debug"
import getInstructions from "./instructions"
import getValueSuggestions from "./values"

function getPosition(model: editor.ITextModel, position: Position): IRange {
	const word = model.getWordUntilPosition(position)
	const range: IRange = {
		startLineNumber: position.lineNumber,
		endLineNumber: position.lineNumber,
		startColumn: word.startColumn,
		endColumn: word.endColumn,
	}
	return range
}
function getLineContent(model: editor.ITextModel, position: Position): string {
	return model.getLineContent(position.lineNumber).substring(0, position.column - 1)
}
export function registerCompletionProvider(monaco: any, languageId: string = "ic10") {
	const languagesApi = monaco.languages as typeof languages
	languagesApi.registerCompletionItemProvider(languageId, {
		provideCompletionItems: (model, position) => {
			const lineContent = getLineContent(model, position)
			const range = getPosition(model, position)
			const suggestions: CompletionItems = []
			const SuggestionArgs: SuggestionArgs = {
				model,
				position,
				range,
				lineContent,
				snippets: suggestions,
			}

			getInstructions(SuggestionArgs)
			getValueSuggestions(SuggestionArgs)
			getDebug(SuggestionArgs)
			// if (lineContent.trim() === "" || /^\s*[a-z]*$/.test(lineContent))
			// 	suggestions.push(...instructions.map((item) => ({ ...item, range })))
			// else if (!lineContent.includes("#")) suggestions.push(...variables.map((item) => ({ ...item, range })))
			// else if (/#\s*]*$/.test(lineContent)) suggestions.push({ ...seed, range })
			return { suggestions }
		},
	})
}
