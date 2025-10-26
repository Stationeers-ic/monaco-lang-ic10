import updateLogicAndConstants from "./constants";
import updateInstructionSnippets from "./updateInstructionSnippets";

export function row(str: string, indent: number): string {
	const indentStr = "\t".repeat(indent);
	return `${indentStr + str}\n`;
}

export function stringifyHtml(str: string): string {
	str = str.trim();
	str = str.replace(/<.*?br.*?>/g, "\n");
	str = str.replace(/<.*?>/g, "");
	// fix &#39; or similar
	str = str.replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
	// fix &quot; &amp; &lt; &gt;
	str = str.replace(/&quot;/g, `"`);
	str = str.replace(/&amp;/g, `&`);
	str = str.replace(/&lt;/g, `<`);
	str = str.replace(/&gt;/g, `>`);
	return str;
}

await Promise.all([await updateLogicAndConstants(), await updateInstructionSnippets()]).then(() => {
	console.log("Data updated successfully.");
}).catch((err) => {
	console.error("Error updating data:", err);
});
