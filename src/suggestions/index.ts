import type { editor, IRange, languages, Position } from "monaco-editor"

export type CompletionItems = languages.CompletionItem[]
export type SuggestionArgs = {
	model: editor.ITextModel
	position: Position
	range: IRange
	lineContent: string
	snippets: CompletionItems
}
export type suggestionFunction = (args: SuggestionArgs) => void
