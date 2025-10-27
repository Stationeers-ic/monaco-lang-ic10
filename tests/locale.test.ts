import { describe, expect, it } from "bun:test"
import { LocaleDataManager, localeFI } from "../src"
import EN from "../src/data/locale/EN"
import FI from "../src/data/locale/FI"

describe("LocaleDataManager", () => {
	it("should return the correct default locale", () => {
		expect(LocaleDataManager.getDefaultLocale()).toBe("EN")
		expect(LocaleDataManager.getLoadedLocales()).toEqual(["EN"])
		// get some finish translations
		const LogicTypeEN = EN.LogicType
		if (typeof LogicTypeEN === "string") throw new Error("LogicType should be an object")
		if (typeof LogicTypeEN.RatioCarbonDioxideOutput2 !== "string")
			throw new Error("LogicType.RatioCarbonDioxideOutput2 should be a string")

		expect(LocaleDataManager.getByKeypath("EN", "LogicType.RatioCarbonDioxideOutput2")).toBe(
			LogicTypeEN.RatioCarbonDioxideOutput2,
		)
		expect(LocaleDataManager.getByKeypath("EN", "NonExistent.Keypath")).toBe("NonExistent.Keypath")
		expect(LocaleDataManager.getByKeypath("EN", "NonExistent.Keypath", true)).toBeNull()

		// load a new locale and test again
		LocaleDataManager.loadLocale("FI", localeFI)
		expect(LocaleDataManager.getLoadedLocales()).toEqual(["EN", "FI"])
		const LogicTypeFI = FI.LogicType
		if (typeof LogicTypeFI === "string") throw new Error("LogicType should be an object")
		if (typeof LogicTypeFI.RatioCarbonDioxideOutput2 !== "string")
			throw new Error("LogicType.RatioCarbonDioxideOutput2 should be a string")

		expect(LocaleDataManager.getByKeypath("FI", "LogicType.RatioCarbonDioxideOutput2")).toBe(
			LogicTypeFI.RatioCarbonDioxideOutput2,
		)
		expect(LocaleDataManager.getByKeypath("FI", "NonExistent.Keypath")).toBe("NonExistent.Keypath")
		expect(LocaleDataManager.getByKeypath("FI", "NonExistent.Keypath", true)).toBeNull()
	})
})
