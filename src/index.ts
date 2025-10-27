export * from "./register"
export * from "./suggestions/suggestions"
export * from "./syntaxDefenition"

import { registerLanguage } from "./register"
export default registerLanguage
export * from "./data/locale"


import localeEN from "./data/locale/EN.json"
import localeCN from "./data/locale/CN.json"
import localeCS from "./data/locale/CS.json"
import localeDA from "./data/locale/DA.json"
import localeDE from "./data/locale/DE.json"
import localeES from "./data/locale/ES.json"
import localeFI from "./data/locale/FI.json"
import localeFR from "./data/locale/FR.json"
import localeHU from "./data/locale/HU.json"
import localeIT from "./data/locale/IT.json"
import localeKN from "./data/locale/KN.json"
import localeKO from "./data/locale/KO.json"
import localeNL from "./data/locale/NL.json"
import localePB from "./data/locale/PB.json"
import localePL from "./data/locale/PL.json"
import localePT from "./data/locale/PT.json"
import localeRO from "./data/locale/RO.json"
import localeRU from "./data/locale/RU.json"
import localeSK from "./data/locale/SK.json"
import localeTR from "./data/locale/TR.json"
import localeTW from "./data/locale/TW.json"

export {
	localeEN,
	localeCN,
	localeCS,
	localeDA,
	localeDE,
	localeES,
	localeFI,
	localeFR,
	localeHU,
	localeIT,
	localeKN,
	localeKO,
	localeNL,
	localePB,
	localePL,
	localePT,
	localeRO,
	localeRU,
	localeSK,
	localeTR,
	localeTW,
}
