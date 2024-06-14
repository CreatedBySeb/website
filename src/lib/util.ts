export function ampersandJoin(array: string[]): string {
	if (array.length === 1) return array.join("");
	else return array.slice(0, -1).join(", ") + " & " + array[array.length - 1];
}
