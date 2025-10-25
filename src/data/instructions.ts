export const allInstructions: {
	name: string
	preview: string
	description: string
	snippet: string
	deprecated?: boolean
}[] = [
	{
		name: "l",
		snippet: "${1:r0} ${2:d0} $0",
		preview: "l r? d? logicType",
		description: "Loads device LogicType to register by housing index value.",
	},
	{
		name: "lb",
		snippet: "${1:r0} $2 $3 $0",
		preview: "lb r? deviceHash logicType batchMode",
		description:
			"Loads LogicType from all output network devices with provided type hash using the provide batch mode. Average (0), Sum (1), Minimum (2), Maximum (3). Can use either the word, or the number.",
	},
	{
		name: "s",
		snippet: "${1:d0} $2 ${0:r0}",
		preview: "s d? logicType r?",
		description: "Stores register value to LogicType on device by housing index value.",
	},
	{
		name: "sb",
		snippet: "$1 $2 ${0:r0}",
		preview: "sb deviceHash logicType r?",
		description: "Stores register value to LogicType on all output network devices with provided type hash.",
	},
	{
		name: "ls",
		snippet: "${1:r0} ${2:d0} $3 $0",
		preview: "ls r? d? slotIndex logicSlotType",
		description: "Loads slot LogicSlotType on device to register.",
	},
	{
		name: "lr",
		snippet: "${1:r0} ${2:d0} $3 $0",
		preview: "lr r? d? reagentMode int",
		description:
			"Loads reagent of device's ReagentMode where a hash of the reagent type to check for. ReagentMode can be either Contents (0), Required (1), Recipe (2). Can use either the word, or the number.",
	},
	{
		name: "alias",
		snippet: "$1 ${0:r0}",
		preview: "alias str r?|d?",
		description:
			"Labels register or device reference with name, device references also affect what shows on the screws on the IC base.",
	},
	{
		name: "define",
		snippet: "$1 $0",
		preview: "define str num",
		description: "Creates a label that will be replaced throughout the program with the provided value.",
	},
	{
		name: "move",
		snippet: "${1:r0} $0",
		preview: "move r? a(r?|num)",
		description: "Register = provided num or register value.",
	},
	{
		name: "add",
		snippet: "${1:r0} $2 $0",
		preview: "add r? a(r?|num) b(r?|num)",
		description: "Register = a + b.",
	},
	{
		name: "sub",
		snippet: "${1:r0} $2 $0",
		preview: "sub r? a(r?|num) b(r?|num)",
		description: "Register = a - b.",
	},
	{
		name: "sdse",
		snippet: "${1:r0} ${0:d0}",
		preview: "sdse r? d?",
		description: "Register = 1 if device is set, otherwise 0.",
	},
	{
		name: "sdns",
		snippet: "${1:r0} ${0:d0}",
		preview: "sdns r? d?",
		description: "Register = 1 if device is not set, otherwise 0",
	},
	{
		name: "slt",
		snippet: "${1:r0} $2 $0",
		preview: "slt r? a(r?|num) b(r?|num)",
		description: "Register = 1 if a < b, otherwise 0",
	},
	{
		name: "sgt",
		snippet: "${1:r0} $2 $0",
		preview: "sgt r? a(r?|num) b(r?|num)",
		description: "Register = 1 if a > b, otherwise 0",
	},
	{
		name: "sle",
		snippet: "${1:r0} $2 $0",
		preview: "sle r? a(r?|num) b(r?|num)",
		description: "Register = 1 if a <= b, otherwise 0",
	},
	{
		name: "sge",
		snippet: "${1:r0} $2 $0",
		preview: "sge r? a(r?|num) b(r?|num)",
		description: "Register = 1 if a >= b, otherwise 0",
	},
	{
		name: "seq",
		snippet: "${1:r0} $2 $0",
		preview: "seq r? a(r?|num) b(r?|num)",
		description: "Register = 1 if a == b, otherwise 0",
	},
	{
		name: "sne",
		snippet: "${1:r0} $2 $0",
		preview: "sne r? a(r?|num) b(r?|num)",
		description: "Register = 1 if a != b, otherwise 0",
	},
	{
		name: "sap",
		snippet: "${1:r0} $2 $3 $0",
		preview: "sap r? a(r?|num) b(r?|num) c(r?|num)",
		description: "Register = 1 if abs(a - b) <= max(c * max(abs(a), abs(b)), float.epsilon * 8), otherwise 0",
	},
	{
		name: "sna",
		snippet: "${1:r0} $2 $3 $0",
		preview: "sna r? a(r?|num) b(r?|num) c(r?|num)",
		description: "Register = 1 if abs(a - b) > max(c * max(abs(a), abs(b)), float.epsilon * 8), otherwise 0",
	},
	{
		name: "sltz",
		snippet: "${1:r0} $0",
		preview: "sltz r? a(r?|num)",
		description: "Register = 1 if a < 0, otherwise 0",
	},
	{
		name: "sgtz",
		snippet: "${1:r0} $0",
		preview: "sgtz r? a(r?|num)",
		description: "Register = 1 if a > 0, otherwise 0",
	},
	{
		name: "slez",
		snippet: "${1:r0} $0",
		preview: "slez r? a(r?|num)",
		description: "Register = 1 if a <= 0, otherwise 0",
	},
	{
		name: "sgez",
		snippet: "${1:r0} $0",
		preview: "sgez r? a(r?|num)",
		description: "Register = 1 if a >= 0, otherwise 0",
	},
	{
		name: "seqz",
		snippet: "${1:r0} $0",
		preview: "seqz r? a(r?|num)",
		description: "Register = 1 if a == 0, otherwise 0",
	},
	{
		name: "snez",
		snippet: "${1:r0} $0",
		preview: "snez r? a(r?|num)",
		description: "Register = 1 if a != 0, otherwise 0",
	},
	{
		name: "sapz",
		snippet: "${1:r0} $2 $0",
		preview: "sapz r? a(r?|num) b(r?|num)",
		description: "Register = 1 if |a| <= float.epsilon * 8, otherwise 0",
	},
	{
		name: "snaz",
		snippet: "${1:r0} $2 $0",
		preview: "snaz r? a(r?|num) b(r?|num)",
		description: "Register = 1 if |a| > float.epsilon, otherwise 0",
	},
	{
		name: "and",
		snippet: "${1:r0} $2 $0",
		preview: "and r? a(r?|num) b(r?|num)",
		description:
			"Performs a bitwise logical AND operation on the binary representation of two values. Each bit of the result is determined by evaluating the corresponding bits of the input values. If both bits are 1, the resulting bit is set to 1. Otherwise the resulting bit is set to 0.",
	},
	{
		name: "or",
		snippet: "${1:r0} $2 $0",
		preview: "or r? a(r?|num) b(r?|num)",
		description:
			"Performs a bitwise logical OR operation on the binary representation of two values. Each bit of the result is determined by evaluating the corresponding bits of the input values. If either bit is 1, the resulting bit is set to 1. If both bits are 0, the resulting bit is set to 0.",
	},
	{
		name: "xor",
		snippet: "${1:r0} $2 $0",
		preview: "xor r? a(r?|num) b(r?|num)",
		description:
			"Performs a bitwise logical XOR (exclusive OR) operation on the binary representation of two values. Each bit of the result is determined by evaluating the corresponding bits of the input values. If the bits are different (one bit is 0 and the other is 1), the resulting bit is set to 1. If the bits are the same (both 0 or both 1), the resulting bit is set to 0.",
	},
	{
		name: "nor",
		snippet: "${1:r0} $2 $0",
		preview: "nor r? a(r?|num) b(r?|num)",
		description:
			"Performs a bitwise logical NOR (NOT OR) operation on the binary representation of two values. Each bit of the result is determined by evaluating the corresponding bits of the input values. If both bits are 0, the resulting bit is set to 1. Otherwise, if at least one bit is 1, the resulting bit is set to 0.",
	},
	{
		name: "mul",
		snippet: "${1:r0} $2 $0",
		preview: "mul r? a(r?|num) b(r?|num)",
		description: "Register = a * b",
	},
	{
		name: "div",
		snippet: "${1:r0} $2 $0",
		preview: "div r? a(r?|num) b(r?|num)",
		description: "Register = a / b",
	},
	{
		name: "mod",
		snippet: "${1:r0} $2 $0",
		preview: "mod r? a(r?|num) b(r?|num)",
		description: "Register = a mod b (note: NOT a % b)",
	},
	{
		name: "j",
		snippet: "$0",
		preview: "j int",
		description: "Jump execution to line a",
	},
	{
		name: "bdse",
		snippet: "${1:d0} $0",
		preview: "bdse d? a(r?|num)",
		description: "Branch to line a if device d is set",
	},
	{
		name: "bdns",
		snippet: "${1:d0} $0",
		preview: "bdns d? a(r?|num)",
		description: "Branch to line a if device d isn't set",
	},
	{
		name: "blt",
		snippet: "$1 $2 $0",
		preview: "blt a(r?|num) b(r?|num) c(r?|num)",
		description: "Branch to line c if a < b",
	},
	{
		name: "bgt",
		snippet: "$1 $2 $0",
		preview: "bgt a(r?|num) b(r?|num) c(r?|num)",
		description: "Branch to line c if a > b",
	},
	{
		name: "ble",
		snippet: "$1 $2 $0",
		preview: "ble a(r?|num) b(r?|num) c(r?|num)",
		description: "Branch to line c if a <= b",
	},
	{
		name: "bge",
		snippet: "$1 $2 $0",
		preview: "bge a(r?|num) b(r?|num) c(r?|num)",
		description: "Branch to line c if a >= b",
	},
	{
		name: "beq",
		snippet: "$1 $2 $0",
		preview: "beq a(r?|num) b(r?|num) c(r?|num)",
		description: "Branch to line c if a == b",
	},
	{
		name: "bne",
		snippet: "$1 $2 $0",
		preview: "bne a(r?|num) b(r?|num) c(r?|num)",
		description: "Branch to line c if a != b",
	},
	{
		name: "bap",
		snippet: "$1 $2 $3 $0",
		preview: "bap a(r?|num) b(r?|num) c(r?|num) d(r?|num)",
		description: "Branch to line d if abs(a - b) <= max(c * max(abs(a), abs(b)), float.epsilon * 8)",
	},
	{
		name: "bna",
		snippet: "$1 $2 $3 $0",
		preview: "bna a(r?|num) b(r?|num) c(r?|num) d(r?|num)",
		description: "Branch to line d if abs(a - b) > max(c * max(abs(a), abs(b)), float.epsilon * 8)",
	},
	{
		name: "bltz",
		snippet: "$1 $0",
		preview: "bltz a(r?|num) b(r?|num)",
		description: "Branch to line b if a < 0",
	},
	{
		name: "bgez",
		snippet: "$1 $0",
		preview: "bgez a(r?|num) b(r?|num)",
		description: "Branch to line b if a >= 0",
	},
	{
		name: "blez",
		snippet: "$1 $0",
		preview: "blez a(r?|num) b(r?|num)",
		description: "Branch to line b if a <= 0",
	},
	{
		name: "bgtz",
		snippet: "$1 $0",
		preview: "bgtz a(r?|num) b(r?|num)",
		description: "Branch to line b if a > 0",
	},
	{
		name: "beqz",
		snippet: "$1 $0",
		preview: "beqz a(r?|num) b(r?|num)",
		description: "Branch to line b if a == 0",
	},
	{
		name: "bnez",
		snippet: "$1 $0",
		preview: "bnez a(r?|num) b(r?|num)",
		description: "branch to line b if a != 0",
	},
	{
		name: "bapz",
		snippet: "$1 $2 $0",
		preview: "bapz a(r?|num) b(r?|num) c(r?|num)",
		description: "Branch to line c if abs(a) <= float.epsilon * 8",
	},
	{
		name: "bnaz",
		snippet: "$1 $2 $0",
		preview: "bnaz a(r?|num) b(r?|num) c(r?|num)",
		description: "Branch to line c if abs(a) > float.epsilon * 8",
	},
	{
		name: "jr",
		snippet: "$0",
		preview: "jr int",
		description: "Relative jump to line a",
	},
	{
		name: "brdse",
		snippet: "${1:d0} $0",
		preview: "brdse d? a(r?|num)",
		description: "Relative jump to line a if device is set",
	},
	{
		name: "brdns",
		snippet: "${1:d0} $0",
		preview: "brdns d? a(r?|num)",
		description: "Relative jump to line a if device is not set",
	},
	{
		name: "brlt",
		snippet: "$1 $2 $0",
		preview: "brlt a(r?|num) b(r?|num) c(r?|num)",
		description: "Relative jump to line c if a < b",
	},
	{
		name: "brgt",
		snippet: "$1 $2 $0",
		preview: "brgt a(r?|num) b(r?|num) c(r?|num)",
		description: "relative jump to line c if a > b",
	},
	{
		name: "brle",
		snippet: "$1 $2 $0",
		preview: "brle a(r?|num) b(r?|num) c(r?|num)",
		description: "Relative jump to line c if a <= b",
	},
	{
		name: "brge",
		snippet: "$1 $2 $0",
		preview: "brge a(r?|num) b(r?|num) c(r?|num)",
		description: "Relative jump to line c if a >= b",
	},
	{
		name: "breq",
		snippet: "$1 $2 $0",
		preview: "breq a(r?|num) b(r?|num) c(r?|num)",
		description: "Relative branch to line c if a == b",
	},
	{
		name: "brne",
		snippet: "$1 $2 $0",
		preview: "brne a(r?|num) b(r?|num) c(r?|num)",
		description: "Relative branch to line c if a != b",
	},
	{
		name: "brap",
		snippet: "$1 $2 $3 $0",
		preview: "brap a(r?|num) b(r?|num) c(r?|num) d(r?|num)",
		description: "Relative branch to line d if abs(a - b) <= max(c * max(abs(a), abs(b)), float.epsilon * 8)",
	},
	{
		name: "brna",
		snippet: "$1 $2 $3 $0",
		preview: "brna a(r?|num) b(r?|num) c(r?|num) d(r?|num)",
		description: "Relative branch to line d if abs(a - b) > max(c * max(abs(a), abs(b)), float.epsilon * 8)",
	},
	{
		name: "brltz",
		snippet: "$1 $0",
		preview: "brltz a(r?|num) b(r?|num)",
		description: "Relative branch to line b if a < 0",
	},
	{
		name: "brgez",
		snippet: "$1 $0",
		preview: "brgez a(r?|num) b(r?|num)",
		description: "Relative branch to line b if a >= 0",
	},
	{
		name: "brlez",
		snippet: "$1 $0",
		preview: "brlez a(r?|num) b(r?|num)",
		description: "Relative branch to line b if a <= 0",
	},
	{
		name: "brgtz",
		snippet: "$1 $0",
		preview: "brgtz a(r?|num) b(r?|num)",
		description: "Relative branch to line b if a > 0",
	},
	{
		name: "breqz",
		snippet: "$1 $0",
		preview: "breqz a(r?|num) b(r?|num)",
		description: "Relative branch to line b if a == 0",
	},
	{
		name: "brnez",
		snippet: "$1 $0",
		preview: "brnez a(r?|num) b(r?|num)",
		description: "Relative branch to line b if a != 0",
	},
	{
		name: "brapz",
		snippet: "$1 $2 $0",
		preview: "brapz a(r?|num) b(r?|num) c(r?|num)",
		description: "Relative branch to line c if abs(a) <= float.epsilon * 8",
	},
	{
		name: "brnaz",
		snippet: "$1 $2 $0",
		preview: "brnaz a(r?|num) b(r?|num) c(r?|num)",
		description: "Relative branch to line c if abs(a) > float.epsilon * 8",
	},
	{
		name: "jal",
		snippet: "$0",
		preview: "jal int",
		description: "Jump execution to line a and store next line number in ra",
	},
	{
		name: "bdseal",
		snippet: "${1:d0} $0",
		preview: "bdseal d? a(r?|num)",
		description: "Jump execution to line a and store next line number if device is set",
	},
	{
		name: "bdnsal",
		snippet: "${1:d0} $0",
		preview: "bdnsal d? a(r?|num)",
		description: "Jump execution to line a and store next line number if device is not set",
	},
	{
		name: "bltal",
		snippet: "$1 $2 $0",
		preview: "bltal a(r?|num) b(r?|num) c(r?|num)",
		description: "Branch to line c if a < b and store next line number in ra",
	},
	{
		name: "bgtal",
		snippet: "$1 $2 $0",
		preview: "bgtal a(r?|num) b(r?|num) c(r?|num)",
		description: "Branch to line c if a > b and store next line number in ra",
	},
	{
		name: "bleal",
		snippet: "$1 $2 $0",
		preview: "bleal a(r?|num) b(r?|num) c(r?|num)",
		description: "Branch to line c if a <= b and store next line number in ra",
	},
	{
		name: "bgeal",
		snippet: "$1 $2 $0",
		preview: "bgeal a(r?|num) b(r?|num) c(r?|num)",
		description: "Branch to line c if a >= b and store next line number in ra",
	},
	{
		name: "beqal",
		snippet: "$1 $2 $0",
		preview: "beqal a(r?|num) b(r?|num) c(r?|num)",
		description: "Branch to line c if a == b and store next line number in ra",
	},
	{
		name: "bneal",
		snippet: "$1 $2 $0",
		preview: "bneal a(r?|num) b(r?|num) c(r?|num)",
		description: "Branch to line c if a != b and store next line number in ra",
	},
	{
		name: "bapal",
		snippet: "$1 $2 $3 $0",
		preview: "bapal a(r?|num) b(r?|num) c(r?|num) d(r?|num)",
		description: "Branch to line c if a != b and store next line number in ra",
	},
	{
		name: "bnaal",
		snippet: "$1 $2 $3 $0",
		preview: "bnaal a(r?|num) b(r?|num) c(r?|num) d(r?|num)",
		description:
			"Branch to line d if abs(a - b) <= max(c * max(abs(a), abs(b)), float.epsilon * 8) and store next line number in ra",
	},
	{
		name: "bltzal",
		snippet: "$1 $0",
		preview: "bltzal a(r?|num) b(r?|num)",
		description: "Branch to line b if a < 0 and store next line number in ra",
	},
	{
		name: "bgezal",
		snippet: "$1 $0",
		preview: "bgezal a(r?|num) b(r?|num)",
		description: "Branch to line b if a >= 0 and store next line number in ra",
	},
	{
		name: "blezal",
		snippet: "$1 $0",
		preview: "blezal a(r?|num) b(r?|num)",
		description: "Branch to line b if a <= 0 and store next line number in ra",
	},
	{
		name: "bgtzal",
		snippet: "$1 $0",
		preview: "bgtzal a(r?|num) b(r?|num)",
		description: "Branch to line b if a > 0 and store next line number in ra",
	},
	{
		name: "beqzal",
		snippet: "$1 $0",
		preview: "beqzal a(r?|num) b(r?|num)",
		description: "Branch to line b if a == 0 and store next line number in ra",
	},
	{
		name: "bnezal",
		snippet: "$1 $0",
		preview: "bnezal a(r?|num) b(r?|num)",
		description: "Branch to line b if a != 0 and store next line number in ra",
	},
	{
		name: "bapzal",
		snippet: "$1 $2 $0",
		preview: "bapzal a(r?|num) b(r?|num) c(r?|num)",
		description: "Branch to line c if abs(a) <= float.epsilon * 8",
	},
	{
		name: "bnazal",
		snippet: "$1 $2 $0",
		preview: "bnazal a(r?|num) b(r?|num) c(r?|num)",
		description: "Branch to line c if abs(a) > float.epsilon * 8",
	},
	{
		name: "sqrt",
		snippet: "${1:r0} $0",
		preview: "sqrt r? a(r?|num)",
		description: "Register = square root of a",
	},
	{
		name: "round",
		snippet: "${1:r0} $0",
		preview: "round r? a(r?|num)",
		description: "Register = a rounded to nearest integer",
	},
	{
		name: "trunc",
		snippet: "${1:r0} $0",
		preview: "trunc r? a(r?|num)",
		description: "Register = a with fractional part removed",
	},
	{
		name: "ceil",
		snippet: "${1:r0} $0",
		preview: "ceil r? a(r?|num)",
		description: "Register = smallest integer greater than a",
	},
	{
		name: "floor",
		snippet: "${1:r0} $0",
		preview: "floor r? a(r?|num)",
		description: "Register = largest integer less than a",
	},
	{
		name: "max",
		snippet: "${1:r0} $2 $0",
		preview: "max r? a(r?|num) b(r?|num)",
		description: "Register = max of a or b",
	},
	{
		name: "min",
		snippet: "${1:r0} $2 $0",
		preview: "min r? a(r?|num) b(r?|num)",
		description: "Register = min of a or b",
	},
	{
		name: "abs",
		snippet: "${1:r0} $0",
		preview: "abs r? a(r?|num)",
		description: "Register = the absolute value of a",
	},
	{
		name: "log",
		snippet: "${1:r0} $0",
		preview: "log r? a(r?|num)",
		description: "Register = log(a)",
	},
	{
		name: "exp",
		snippet: "${1:r0} $0",
		preview: "exp r? a(r?|num)",
		description: "Register = exp(a)",
	},
	{
		name: "rand",
		snippet: "${0:r0}",
		preview: "rand r?",
		description: "Register = a random value x with 0 <= x < 1",
	},
	{
		name: "yield",
		snippet: "",
		preview: "yield",
		description: "Pauses execution for 1 tick",
	},
	{
		name: "label",
		snippet: "",
		preview: "",
		description: "DEPRECATED",
		deprecated: true,
	},
	{
		name: "peek",
		snippet: "${0:r0}",
		preview: "peek r?",
		description: "Register = the value at the top of the stack",
	},
	{
		name: "push",
		snippet: "$0",
		preview: "push a(r?|num)",
		description: "Pushes the value of a to the stack at sp and increments sp",
	},
	{
		name: "pop",
		snippet: "${0:r0}",
		preview: "pop r?",
		description: "Register = the value at the top of the stack and decrements sp",
	},
	{
		name: "hcf",
		snippet: "",
		preview: "hcf",
		description: "Halt and catch fire",
	},
	{
		name: "select",
		snippet: "${1:r0} $2 $3 $0",
		preview: "select r? a(r?|num) b(r?|num) c(r?|num)",
		description: "Register = b if a is non-zero, otherwise c",
	},
	{
		name: "sleep",
		snippet: "$0",
		preview: "sleep a(r?|num)",
		description: "Pauses execution on the IC for a seconds",
	},
	{
		name: "sin",
		snippet: "${1:r0} $0",
		preview: "sin r? a(r?|num)",
		description: "Returns the sine of the specified angle (radians)",
	},
	{
		name: "cos",
		snippet: "${1:r0} $0",
		preview: "cos r? a(r?|num)",
		description: "Returns the cosine of the specified angle (radians)",
	},
	{
		name: "tan",
		snippet: "${1:r0} $0",
		preview: "tan r? a(r?|num)",
		description: "Returns the tan of the specified angle (radians)",
	},
	{
		name: "asin",
		snippet: "${1:r0} $0",
		preview: "asin r? a(r?|num)",
		description: "Returns the angle (radians) whos sine is the specified value",
	},
	{
		name: "acos",
		snippet: "${1:r0} $0",
		preview: "acos r? a(r?|num)",
		description: "Returns the cosine of the specified angle (radians)",
	},
	{
		name: "atan",
		snippet: "${1:r0} $0",
		preview: "atan r? a(r?|num)",
		description: "Returns the angle (radians) whos tan is the specified value",
	},
	{
		name: "atan2",
		snippet: "${1:r0} $2 $0",
		preview: "atan2 r? a(r?|num) b(r?|num)",
		description:
			"Returns the angle (radians) whose tangent is the quotient of two specified values: a (y) and b (x)",
	},
	{
		name: "ld",
		snippet: "${1:r0} $2 $0",
		preview: "ld r? id(r?|num) logicType",
		description: "Loads device LogicType to register by direct ID reference.",
	},
	{
		name: "lbn",
		snippet: "${1:r0} $2 $3 $4 $0",
		preview: "lbn r? deviceHash nameHash logicType batchMode",
		description:
			"Loads LogicType from all output network devices with provided type and name hashes using the provide batch mode. Average (0), Sum (1), Minimum (2), Maximum (3). Can use either the word, or the number.",
	},
	{
		name: "lbs",
		snippet: "${1:r0} $2 $3 $4 $0",
		preview: "lbs r? deviceHash slotIndex logicSlotType batchMode",
		description:
			"Loads LogicSlotType from slotIndex from all output network devices with provided type hash using the provide batch mode. Average (0), Sum (1), Minimum (2), Maximum (3). Can use either the word, or the number.",
	},
	{
		name: "lbns",
		snippet: "${1:r0} $2 $3 $4 $0",
		preview: "lbns r? deviceHash nameHash slotIndex logicSlotType batchMode",
		description:
			"Loads LogicSlotType from slotIndex from all output network devices with provided type and name hashes using the provide batch mode. Average (0), Sum (1), Minimum (2), Maximum (3). Can use either the word, or the number.",
	},
	{
		name: "sd",
		snippet: "$1 $2 ${0:r0}",
		preview: "sd id(r?|num) logicType r?",
		description: "Stores register value to LogicType on device by direct ID reference.",
	},
	{
		name: "ss",
		snippet: "${1:d0} $2 $3 ${0:r0}",
		preview: "ss d? slotIndex logicSlotType r?",
		description: "Stores register value to device stored in a slot LogicSlotType on device.",
	},
	{
		name: "sbs",
		snippet: "$1 $2 $3 ${0:r0}",
		preview: "sbs deviceHash slotIndex logicSlotType r?",
		description:
			"Stores register value to LogicSlotType on all output network devices with provided type hash in the provided slot.",
	},
	{
		name: "snan",
		snippet: "${1:r0} $0",
		preview: "snan r? a(r?|num)",
		description: "Register = 1 if a is NaN, otherwise 0",
	},
	{
		name: "snanz",
		snippet: "${1:r0} $0",
		preview: "snanz r? a(r?|num)",
		description: "Register = 0 if a is NaN, otherwise 1",
	},
	{
		name: "bnan",
		snippet: "$1 $0",
		preview: "bnan a(r?|num) b(r?|num)",
		description: "Branch to line b if a is not a number (NaN)",
	},
	{
		name: "brnan",
		snippet: "$1 $0",
		preview: "brnan a(r?|num) b(r?|num)",
		description: "Relative branch to line b if a is not a number (NaN)",
	},
	{
		name: "get",
		snippet: "${1:r0} ${0:d0}",
		preview: "get r? d? address(r?|num)",
		description:
			"Using the provided device, attempts to read the stack value at the provided address, and places it in the register.",
	},
	{
		name: "getd",
		snippet: "${1:r0} $2 $0",
		preview: "getd r? id(r?|num) address(r?|num)",
		description:
			"Seeks directly for the provided device id, attempts to read the stack value at the provided address, and places it in the register.",
	},
	{
		name: "not",
		snippet: "${1:r0} $0",
		preview: "not r? a(r?|num)",
		description:
			"Performs a bitwise logical NOT operation flipping each bit of the input value, resulting in a binary complement. If a bit is 1, it becomes 0, and if a bit is 0, it becomes 1.",
	},
	{
		name: "poke",
		snippet: "$1 $0",
		preview: "poke address(r?|num) value(r?|num)",
		description: "Stores the provided value at the provided address in the stack.",
	},
	{
		name: "put",
		snippet: "${1:d0} $2 $0}",
		preview: "put d? address(r?|num) value(r?|num)",
		description:
			"Using the provided device, attempts to write the provided value to the stack at the provided address.",
	},
	{
		name: "putd",
		snippet: "$1 $2 $0",
		preview: "putd id(r?|num) address(r?|num) value(r?|num)",
		description:
			"Seeks directly for the provided device id, attempts to write the provided value to the stack at the provided address.",
	},
	{
		name: "sbn",
		snippet: "$1 $2 $3 ${0:r0}",
		preview: "sbn deviceHash nameHash logicType r?",
		description:
			"Stores register value to LogicType on all output network devices with provided type hash and name.",
	},
	{
		name: "sla",
		snippet: "${1:r0} $2 $0",
		preview: "sla r? a(r?|num) b(r?|num)",
		description:
			"Performs a bitwise arithmetic left shift operation on the binary representation of a value. It shifts the bits to the left and fills the vacated rightmost bits with a copy of the sign bit (the most significant bit).",
	},
	{
		name: "sll",
		snippet: "${1:r0} $2 $0",
		preview: "sll r? a(r?|num) b(r?|num)",
		description:
			"Performs a bitwise logical left shift operation on the binary representation of a value. It shifts the bits to the left and fills the vacated rightmost bits with zeros.",
	},
	{
		name: "sra",
		snippet: "${1:r0} $2 $0",
		preview: "sra r? a(r?|num) b(r?|num)",
		description:
			"Performs a bitwise arithmetic right shift operation on the binary representation of a value. It shifts the bits to the right and fills the vacated leftmost bits with a copy of the sign bit (the most significant bit).",
	},
	{
		name: "srl",
		snippet: "${1:r0} $2 $0",
		preview: "srl r? a(r?|num) b(r?|num)",
		description:
			"Performs a bitwise logical right shift operation on the binary representation of a value. It shifts the bits to the right and fills the vacated leftmost bits with zeros",
	},
	{
		name: "bdnvl",
		snippet: "${1:d0} $2 $0}",
		preview: "bdnvl device(d?|r?|id) logicType a(r?|num)",
		description:
			"Will branch to line a if the provided device not valid for a load instruction for the provided logic type.",
	},
	{
		name: "bdnvs",
		snippet: "${1:d0} $2 $0}",
		preview: "bdnvs device(d?|r?|id) logicType a(r?|num)",
		description:
			"Will branch to line a if the provided device not valid for a store instruction for the provided logic type.",
	},
	{
		name: "clr",
		snippet: "${0:d0}",
		preview: "clr d?",
		description: "Clears the stack memory for the provided device.",
	},
	{
		name: "clrd",
		snippet: "$0",
		preview: "clrd id(r?|num)",
		description: "Seeks directly for the provided device id and clears the stack memory of that device",
	},
	{
		name: "ext",
		snippet: "${1:r0} $2 $3 $0",
		preview: "ext r? a(r?|num) b(r?|num) c(r?|num)",
		description:
			"Extracts a bit field from a, beginning at b for c length and placed in the provided register. Payload cannot exceed 53 bits in final length.",
	},
	{
		name: "ins",
		snippet: "${1:r0} $2 $3 $0",
		preview: "ins r? a(r?|num) b(r?|num) c(r?|num)",
		description:
			"Inserts a bit field of a into the provided register, beginning at b for c length. Payload cannot exceed 53 bits in final length.",
	},
	{
		name: "lerp",
		snippet: "${1:r0} $2 $3 $0",
		preview: "lerp r? a(r?|num) b(r?|num) c(r?|num)",
		description:
			"Linearly interpolates between a and b by the ratio c, and places the result in the register provided. The ratio c will be clamped between 0 and 1.",
	},
	{
		name: "rmap",
		snippet: "${1:r0} ${2:d0} $0",
		preview: "rmap r? d? reagentHash(r?|num)",
		description:
			"Given a reagent hash, store the corresponding prefab hash that the device expects to fulfill the reagent requirement. For example, on an autolathe, the hash for Iron will store the hash for ItemIronIngot.",
	},
	{
		name: "pow",
		snippet: "${1:r0} $2 $0",
		preview: "pow r? a(r?|num) b(r?|num)",
		description:
			"Stores the result of raising a to the power of b in the register. Follows IEEE-754 standard for floating point arithmetic.",
	},
]

export default allInstructions
