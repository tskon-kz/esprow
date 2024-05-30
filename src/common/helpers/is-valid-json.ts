function isValidJson(value: string) {
	try {
		const data = JSON.parse(value);
		return Array.isArray(data);
	} catch {
		return false;
	}
}

export default isValidJson;
