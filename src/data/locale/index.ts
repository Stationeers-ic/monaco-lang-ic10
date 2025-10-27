import EN from "./EN"
export type locale =
	| "CN"
	| "CS"
	| "DA"
	| "DE"
	| "ES"
	| "FI"
	| "FR"
	| "HU"
	| "IT"
	| "KN"
	| "KO"
	| "NL"
	| "PB"
	| "PL"
	| "PT"
	| "RO"
	| "RU"
	| "SK"
	| "TR"
	| "TW"

export type localeData = {
	[key: string]: string | localeData
}
class _LocaleDataManager {
	private loadedLocales: Map<string, localeData> = new Map()
	private defaultLocale: string = "EN"
	private fallbackLocale: string = "EN"

	constructor() {
		// Load the default English locale
		this.loadedLocales.set("EN", EN)
	}
	/**
	 * Set the default fallback locale.
	 * @param locale
	 */
	setDefaultLocale(locale: string) {
		this.defaultLocale = locale.toUpperCase()
	}
	/**
	 * Get the current default locale.
	 * @returns The default locale code.
	 */
	getDefaultLocale(): string {
		return this.defaultLocale
	}
	/**
	 * Get a list of all loaded locale codes.
	 * @returns An array of loaded locale codes.
	 */
	getLoadedLocales(): string[] {
		return Array.from(this.loadedLocales.keys())
	}
	/**
	 * Set locale data for the specified locale. (Overwrites existing data.)
	 * @param locale - The locale code (e.g., "EN", "CN").
	 * @param data - The locale data to load.
	 */
	loadLocale(locale: string, data: localeData) {
		this.loadedLocales.set(locale.toUpperCase(), data)
	}
	/**
	 * Merge new locale data into existing data for the specified locale.
	 * @param locale - The locale code (e.g., "EN", "CN").
	 * @param data - The locale data to merge with existing data.
	 */
	updateLocale(locale: string, data: localeData) {
		const existingData = this.loadedLocales.get(locale.toUpperCase()) || {}
		this.mergeLocaleData(existingData, data)
	}
	private mergeLocaleData(existingData: localeData, data: localeData) {
		for (const key in data) {
			const value = data[key]
			if (typeof value === "object" && typeof existingData[key] === "object") {
				this.mergeLocaleData(existingData[key], value)
				continue
			}
			if (typeof value === "string" && typeof existingData[key] === "object")
				// Conflict: existing is object, new is string, skip
				continue

			existingData[key] = value
		}
	}
	private getByKeypathRecursive(data: localeData, keys: string[] | string): string | null {
		if (typeof keys === "string")
			keys = keys.split(".")

		let current: localeData = data
		for (let i = 0; i < keys.length; i++) {
			const key = keys[i]
			const value = current[key]
			if (value === undefined) break
			// If it's the last key, return the value if it's a string
			if (i === keys.length - 1)
				if (typeof value === "string") return value
				else break
			// If not the last key, the value must be an object to continue
			if (typeof value === "object")
				current = value as localeData
			else break
		}
		// If we exit the loop without returning, the keypath is invalid
		return null
	}
	getByKeypath(locale: string, keypath: string, nullable?: false): string
	getByKeypath(locale: string, keypath: string, nullable: true): string | null
	getByKeypath(locale: string, keypath: string, nullable: boolean = false): string | null {
		const localeData = this.loadedLocales.get(locale.toUpperCase())
		if (!localeData && locale.toUpperCase() === this.fallbackLocale) return nullable ? null : keypath
		// If locale data not found, fallback to this.defaultLocale
		if (!localeData) return this.getByKeypath(this.fallbackLocale, keypath)
		const keys = keypath.split(".")
		const result = this.getByKeypathRecursive(localeData, keys)
		if (result !== null) return result
		// Fallback to this.defaultLocale if not found
		if (locale.toUpperCase() !== this.fallbackLocale)
			if (nullable) return this.getByKeypath(this.fallbackLocale, keypath, nullable)
			else return this.getByKeypath(this.fallbackLocale, keypath, nullable)
		return nullable ? null : keypath
	}
	getDefaultByKeypath(keypath: string, nullable?: false): string
	getDefaultByKeypath(keypath: string, nullable: true): string | null
	getDefaultByKeypath(keypath: string, nullable: boolean = false): string | null {
		if (nullable)
		return this.getByKeypath(this.defaultLocale, keypath, nullable)
		return this.getByKeypath(this.defaultLocale, keypath, nullable)
	}

}
const LocaleDataManager = new _LocaleDataManager()
export default LocaleDataManager
