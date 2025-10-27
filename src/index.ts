export * from "./register"
export * from "./suggestions/suggestions"
export * from "./syntaxDefenition"

import { registerLanguage } from "./register"
export default registerLanguage

import LocaleDataManager from "./data/locale"
export { LocaleDataManager }
export type { locale, localeData } from "./data/locale/index"

import CN from "./data/locale/CN"
import CS from "./data/locale/CS"
import DA from "./data/locale/DA"
import DE from "./data/locale/DE"
import ES from "./data/locale/ES"
import FI from "./data/locale/FI"
import FR from "./data/locale/FR"
import HU from "./data/locale/HU"
import IT from "./data/locale/IT"
import KN from "./data/locale/KN"
import KO from "./data/locale/KO"
import NL from "./data/locale/NL"
import PB from "./data/locale/PB"
import PL from "./data/locale/PL"
import PT from "./data/locale/PT"
import RO from "./data/locale/RO"
import RU from "./data/locale/RU"
import SK from "./data/locale/SK"
import TR from "./data/locale/TR"
import TW from "./data/locale/TW"

export {
	CN as localeCN,
	CS as localeCS,
	DA as localeDA,
	DE as localeDE,
	ES as localeES,
	FI as localeFI,
	FR as localeFR,
	HU as localeHU,
	IT as localeIT,
	KN as localeKN,
	KO as localeKO,
	NL as localeNL,
	PB as localePB,
	PL as localePL,
	PT as localePT,
	RO as localeRO,
	RU as localeRU,
	SK as localeSK,
	TR as localeTR,
	TW as localeTW,
}
