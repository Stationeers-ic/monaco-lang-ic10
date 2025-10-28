import type { languages } from "monaco-editor"
import { isConstant, type nestedData } from "./data"
import rawConstants from "./data/constants"
import rawInstructions from "./data/instructions"
import rawLogic from "./data/logic"
export const conf: languages.LanguageConfiguration = {
	comments: {
		lineComment: "#",
	},
	brackets: [['("', '")']],
	autoClosingPairs: [{ open: '("', close: '")' }],
	surroundingPairs: [{ open: '("', close: '")' }],
}
const instructions: string[] = []
for (let i = 0; i < rawInstructions.length; i++) {
	const ins = rawInstructions[i]
	if (!ins || ins.name.length === 0) continue
	instructions.push(ins.name)
}
function getLiterals(data: nestedData, literals: string[] = []): string[] {
	for (const key in data) {
		const value = data[key]
		if (isConstant(value)) literals.push(value.literal)
		else getLiterals(value, literals)
	}
	return literals
}

const logic: string[] = getLiterals(rawLogic)

const constants: string[] = getLiterals(rawConstants)

export const language: languages.IMonarchLanguage = {
	defaultToken: "",
	tokenPostfix: ".ic10",

	instructions: instructions,
	logic: logic,
	constants: constants,

	brackets: [{ token: "delimiter.parenthesis", open: '("', close: '")' }],

	// we include these common regular expressions

	// The main tokenizer for our languages
	tokenizer: {
		root: [
			// [/#.*$/, 'comment', '@comment'],
			[/^\s*/, { token: "", next: "@instruction" }], // labels at the start of the line
			{ include: "@arguments" },
			[/.*$/, "comment", "@popall"],
			// [/./, { next: "@popall" }],
		],
		comment: [
			[/#(?:(?:\s*[\w]+\s*:[^\n\r]*?)|(?:\s*\w+\s*));/, "@rematch", "@debugComment"],
			[/[^#]*$/, "comment", "@popall"],
			[/[^#]+/, "comment"],
			[/#/, "comment"],
			// [/.*$/, "comment", "@popall"],
		],
		// seed: [
		// 	[/\s*seed:/, "string"],
		// 	[/\d+$/, "number", "@popall"],
		// 	[/\d+/, "number", "@pop"],

		debugComment: [
			[/#/, "comment.debugStart"],
			[/\s*\w+\s*;/, { token: "number.debugFunction", goBack: 1 }],
			[/\s*\w+\s*:/, "@rematch", "@debugWithArgument"],
			[/[^;]+/, "comment.debugInvalid"],
			[/;$/, "comment.debugEnd", "@popall"],
			[/;/, "comment.debugEnd", "@pop"],
		],
		debugWithArgument: [
			[/\s*\w+\s*/, "number.debugFunction"],
			[/:/, "delimiter.debugCall", "@debugArgument"],
			[/[^;]+/, "comment.debugInvalid"],
			[/;/, { token: "", next: "@pop", goBack: 1 }],
		],
		debugArgument: [
			[/\s*'[^\r\n]*'\s*[,;]/, { token: "string.debugArgument", goBack: 1 }],
			[/\s*"[^\r\n]*"\s*[,;]/, { token: "string.debugArgument", goBack: 1 }],
			[/\s*[^\s;,'"]+\s*[,;]/, { token: "number.debugArgument", goBack: 1 }],
			[/,/, "delimiter.debugArgument"],
			[/[^;]+/, "comment.debugInvalid"],
			[/;/, { token: "", next: "@pop", goBack: 1 }],
		],
		whitespace: [
			[/\s+/, ""],
			[/#/, "@rematch", "@comment"],
		],
		instruction: [
			{ include: "@whitespace" },
			[/[a-zA-Z_\d]+:/, { token: "support.type", next: "@pop" }],
			[
				/[a-zA-Z_\d]+/,
				{
					cases: {
						define: { token: "keyword.$0", next: "@define" },
						alias: { token: "keyword.$0", next: "@alias" },
						j: { token: "keyword.$0", next: "@label" },
						"@instructions": { token: "keyword.$0", next: "@popall" },
						// '@default': 'identifier'
					},
				},
			],
		],
		define: [{ include: "@whitespace" }, [/[a-zA-Z_.]*/, "constant.numeric", "@popall"]],
		alias: [{ include: "@whitespace" }, [/[a-zA-Z_.]*/, "variable", "@popall"]],
		label: [
			{ include: "@whitespace" },
			[/[^\s#]+\s*$/, "support.type", "@popall"],
			[/[^\s#]+\s*/, "support.type", "@popall"]
		],
		register: [
			[/r+\d+/, "variable"],
			[/db/, "variable.language"],
			[/dr*\d+:\d*/, "@rematch", "channel"],
			[/dr*\d+/, "variable.predefined"],
		],
		channel: [
			[/dr*\d+/, "variable.predefined"],
			[/:\d+/, "delimiter.channel", "channelArgument"],
			[/:/, "delimiter.channel", "@popall"],
		],
		channelArgument: [
			[/:/, "delimiter.channel"],
			[/\d+/, "number.channel", "@popall"]
		],
		arguments: [
			{ include: "@whitespace" },
			{ include: "@register" },
			{ include: "@function" },
			{ include: "@numbers" },
			[
				/[a-zA-Z_]*[\w\d.]+/,
				{
					cases: {
						"@logic": { token: "variable.parameter" },
						"@constants": { token: "constant" },
						// '@default': 'identifier'
					},
				},
			],
		],

		function: [
			[/HASH/, "constant.language", "@functionCall"],
			[/STR/, "constant.language", "@functionCall"],
		],
		functionCall: [
			[/\("/, { token: "delimiter.parenthesis", next: "@string" }],
			[/"\)/, { token: "delimiter.parenthesis", next: "@pop" }],
		],
		string: [[/[^\r\n"]*/, "string", "@pop"]],
		numbers: [
			[/-?\d+(?:\.\d+)/, "number.float"],
			[/-?\d+/, "number"],
			[/-?%/, "number.bin.start", "@bin"],
			[/-?\$/, "number.hex.start", "@hex"],
		],
		bin: [[/[01_]+/, "number.bin", "@pop"]],
		hex: [[/[0-9a-fA-F_]+/, "number.hex", "@pop"]],
	},
}
