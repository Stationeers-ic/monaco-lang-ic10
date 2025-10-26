export const kindEnum = {
	Constant: 0,
	Enum: 1,
} as const
export type kindEnum = typeof kindEnum[keyof typeof kindEnum]
