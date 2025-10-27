// scan https://assets.ic10.dev/languages/[]/ for locale files and generate a summary file listing available locales
import { writeFile } from "node:fs/promises"
import { stringifyHtml } from "."

const locales = [
	"CN",
	"CS",
	"DA",
	"DE",
	// "EN", // English is the default language, no need to list it
	"ES",
	"FI",
	"FR",
	"HU",
	"IT",
	"KN",
	"KO",
	"NL",
	"PB",
	"PL",
	"PT",
	"RO",
	"RU",
	"SK",
	"TR",
	"TW",
] as const
type locale = (typeof locales)[number]
const localesInfo: Record<locale | "EN", Record<string, string>> = {
	EN: {},
	CN: {},
	CS: {},
	DA: {},
	DE: {},
	ES: {},
	FI: {},
	FR: {},
	HU: {},
	IT: {},
	KN: {},
	KO: {},
	NL: {},
	PB: {},
	PL: {},
	PT: {},
	RO: {},
	RU: {},
	SK: {},
	TR: {},
	TW: {},
}

async function generateLocale(locale: locale | "EN"): Promise<number> {
	const localeIndexUrl = "https://assets.ic10.dev/languages/"
	const localeData = localesInfo[locale]
	const logic = await fetch(`${localeIndexUrl}${locale}/logics.json`).then((res) => res.json())
	let added = 0
	for (let i = 0; i < logic.data.length; i++) {
		const item = logic.data[i]
		const name = item.literal || item.name
		const description = stringifyHtml(item.description)
		if (!name || !description) continue
		if (localesInfo.EN[name] === description) continue
		localeData[name] = description
		added++
	}
	const instructions = await fetch(`${localeIndexUrl}${locale}/instructions.json`).then((res) => res.json())
	const instructionEntries = Object.entries(instructions)
	for (let i = 0; i < instructionEntries.length; i++) {
		const raw = instructionEntries[i]
		if (!raw[1]) continue
		const item = raw[1] as { name: string; description: string }
		if (item.name !== raw[0]) continue
		const name = item.name
		const description = stringifyHtml(item.description)
		if (!name || !description) continue
		if (localesInfo.EN[name] === description) continue
		if (localeData[name]) console.log(`Duplicate locale entry for ${name} in ${locale}`)
		localeData[name] = description
		added++
	}
	const constants = await fetch(`${localeIndexUrl}${locale}/constants.json`).then((res) => res.json())
	const constantEntries = Object.entries(constants)
	for (let i = 0; i < constantEntries.length; i++) {
		const raw = constantEntries[i]
		const item = raw[1] as { literal: string; description: string }
		if (!item) continue
		if (item.literal !== raw[0]) continue
		const name = item.literal
		const description = stringifyHtml(item.description)
		if (!name || !description) continue
		if (localesInfo.EN[name] === description) continue
		if (localeData[name]) console.log(`Duplicate locale entry for ${name} in ${locale}`)
		localeData[name] = description
		added++
	}
	return added
}

async function saveLocaleFile(locale: locale | "EN", data: Record<string, string>) {
	const fileContent = JSON.stringify(data, null, 2)
	await writeFile(`./src/data/locale/${locale}.json`, fileContent, "utf-8")
}

async function generateLocales() {
	const localeIndexUrl = "https://assets.ic10.dev/languages/"
	const eng = await generateLocale("EN")
	console.log(`Locale EN: added ${eng} entries`)
	const promises: Promise<any>[] = []
	for (const locale of locales) {
		promises.push(
			generateLocale(locale).then((added) => {
				console.log(`Locale ${locale}: added ${added.toString().padStart(3, " ")} entries`)
			}),
		)
	}
	await Promise.all(promises)
	for (const locale of ["EN", ...locales] as (locale | "EN")[]) {
		await saveLocaleFile(locale, localesInfo[locale])
	}
}

export default generateLocales
