export default function isValiDate(dateString: string) {
	const date = new Date(dateString);
	const result = Object.prototype.toString.call(date) === '[object Date]' && !isNaN(Number(date));

	return result;
}
