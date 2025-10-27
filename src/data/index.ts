export type constant = {
	literal: string
	value: number
	deprecated?: boolean
	kind: 0 | 1
}
export function isConstant(obj: any): obj is constant {
	return (
		obj &&
		typeof obj === "object" &&
		typeof obj.literal === "string" &&
		typeof obj.value === "number" &&
		(obj.deprecated === undefined || typeof obj.deprecated === "boolean") &&
		(obj.kind === 0 || obj.kind === 1)
	)
}

export type nestedData = { [key: string]: constant | nestedData }
