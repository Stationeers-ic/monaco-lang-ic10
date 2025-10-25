import type { languages } from "monaco-editor"
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
const logic: string[] = []
for (let i = 0; i < rawLogic.length; i++) {
	const ins = rawLogic[i]
	if (!ins || ins.name.length === 0) continue
	logic.push(ins.name)
}
const constants: string[] = []
for (let i = 0; i < rawConstants.length; i++) {
	const ins = rawConstants[i]
	if (!ins || ins.name.length === 0) continue
	constants.push(ins.name)
}

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
			[/.*$/, "comment"],
		],
		comment: [
			[/\s*seed:/, "string", "@seed"],
			[/.*$/, "comment", "@popall"],
		],
		seed: [[/\d+/, "number", "@pop"]],
		whitespace: [
			[/\s+/, ""],
			[/#/, "comment", "@comment"],
		],
		instruction: [
			{ include: "@whitespace" },
			[/[a-zA-Z_.]*:/, { token: "support.type", next: "@pop" }],
			[
				/[a-zA-Z_.]*/,
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
		label: [{ include: "@whitespace" }, [/[^\s#]+\s*/, "support.type", "@popall"]],
		register: [
			[/r+\d+/, "variable"],
			[/db/, "variable.language"],
			[/d\d+/, "variable.predefined"],
			[/d[r]+\d+/, "variable.predefined"],
		],
		arguments: [
			{ include: "@whitespace" },
			{ include: "@register" },
			{ include: "@function" },
			{ include: "@numbers" },
			[
				/[a-zA-Z_.]*/,
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
			[/-?\d+(?:\.\d)?\d*/, "number.float"],
			[/-?\d+/, "number"],
			[/%/, "number.bin.start", "@bin"],
			[/\$/, "number.hex.start", "@hex"],
		],
		bin: [[/[01_]+/, "number.bin", "@pop"]],
		hex: [[/[0-9a-fA-F_]+/, "number.hex", "@pop"]],
		// 	// keys
		// 	[/(,)(\s*)([a-zA-Z_]\w*)(\s*)(:)(?!:)/, ['delimiter', '', 'key', '', 'delimiter']],
		// 	[/({)(\s*)([a-zA-Z_]\w*)(\s*)(:)(?!:)/, ['@brackets', '', 'key', '', 'delimiter']],

		// 	// delimiters and operators
		// 	[/[()]/, '@brackets'],
		// 	[
		// 		/@symbols/,
		// 		{
		// 			cases: {
		// 				'@operators': 'delimiter',
		// 				'@default': ''
		// 			}
		// 		}
		// 	],

		// 	// numbers
		// 	[/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
		// 	[/0[xX][0-9a-fA-F_]*[0-9a-fA-F]/, 'number.hex'],
		// 	[/\d+?/, 'number'],

		// 	// delimiter: after number because of .\d floats
		// 	[/[;,.]/, 'delimiter'],

		// 	// strings: recover on non-terminated strings
		// 	[/"([^"\\]|\\.)*$/, 'string.invalid'], // non-teminated string
		// 	[/'([^'\\]|\\.)*$/, 'string.invalid'], // non-teminated string
		// 	[/"/, 'string', '@string."'],
		// 	[/'/, 'string', "@string.'"]
		// ],

		// whitespace: [
		// 	[/[ \t\r\n]+/, ''],
		// 	[/#\[([=]*)\[/, 'comment', '@comment.$1'],
		// 	[/#.*$/, 'comment']
		// ],

		// comment: [
		// 	[/[^\]]+/, 'comment'],
		// 	[
		// 		/\]([=]*)\]/,
		// 		{
		// 			cases: {
		// 				'$1==$S2': { token: 'comment', next: '@pop' },
		// 				'@default': 'comment'
		// 			}
		// 		}
		// 	],
		// 	[/./, 'comment']
		// ],
	},
}
