// import { languages } from "monaco-editor"
import { registerCompletionProvider } from "./suggestions.js"
import { conf, language } from "./syntaxDefenition.js"
/**
 * Registers the IC10 language with Monaco Editor.
 */
export function registerLanguage(monaco: any) {
	monaco.languages.register({ id: "ic10" })
	monaco.languages.setMonarchTokensProvider("ic10", language)
	monaco.languages.setLanguageConfiguration("ic10", conf)
	registerCompletionProvider(monaco)
}
