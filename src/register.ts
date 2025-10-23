import { languages } from "monaco-editor"
import { conf, language } from './syntaxDefenition.js';
/**
 * Registers the IC10 language with Monaco Editor.
 */
export function registerLanguage() {
	languages.register({ id: 'ic10' });
	languages.setMonarchTokensProvider('ic10', language);
	languages.setLanguageConfiguration('ic10', conf);
}
