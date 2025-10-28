import type { languages } from "monaco-editor"
import { type constant, isConstant, type nestedData } from "../data"
import rawConstants from "../data/constants"
import i18n from "../data/locale"
import rawLogic from "../data/logic"
import { kindEnum } from "../enums"
import type { suggestionFunction } from "."

const cachedValues: {
	cache: Map<string, Omit<languages.CompletionItem, "range">>
	locale: string
} = {
	cache: new Map(),
	locale: "",
}
const getValueSuggestions: suggestionFunction = ({ range, snippets, lineContent }) => {
	if (lineContent.includes("#")) return
	if (lineContent.trim() === "" || /^\s*[a-z]*$/.test(lineContent)) return
	if (cachedValues.locale !== i18n.language) generateValue()
	const Value = /(?:((?:\S*)\.)\w*|(\S+))$/.exec(lineContent)
	if (!Value) {
		for (const [key, item] of cachedValues.cache.entries()) {
			if (key.includes(".")) continue
			snippets.push({ ...item, range })
		}
		return
	}
	const valuePrefix = Value[1]

	for (const [key, item] of cachedValues.cache.entries()) {
		if (!valuePrefix && key.includes(".")) continue
		if (valuePrefix && !key.startsWith(valuePrefix)) continue
		snippets.push({ ...item, range })
	}
}
function* generateItems(items?: nestedData, name = ""): Generator<[constant, string, string] | string, void, unknown> {
	const entries = Object.entries(items ?? { ...rawLogic, ...rawConstants })
	for (let i = 0; i < entries.length; i++) {
		const [key, value] = entries[i]
		if (isConstant(value)) yield [value, name, key]
		else {
			yield name + key
			yield* generateItems(value, `${name + key}.`)
		}
	}
}
const generateValue = (): void => {
	cachedValues.cache.clear()
	for (const constant of generateItems()) {
		if (typeof constant === "string") {
			cachedValues.cache.set(constant, {
				label: constant,
				kind: 15, // languages.CompletionItemKind.Enum,
				insertText: `${constant.trim()}.`,
				insertTextRules: 1, // languages.CompletionItemInsertTextRule.None,
				command: {
					id: "editor.action.triggerSuggest",
					title: "Trigger Suggest",
				},
			})
			continue
		}
		const [item, path, name] = constant
		cachedValues.cache.set(path + name, {
			label: name,
			kind:
				item.kind === kindEnum.Enum
					? 16 // languages.CompletionItemKind.EnumMember,
					: 14, // languages.CompletionItemKind.Constant,
			insertText: name,
			insertTextRules: 0, // languages.CompletionItemInsertTextRule.None,
			detail: item.value.toString(),
			documentation: i18n.t(item.literal) || undefined,
		})
	}

	cachedValues.locale = i18n.language
}
export default getValueSuggestions
