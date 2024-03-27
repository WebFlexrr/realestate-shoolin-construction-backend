const createSlug = (str) => {
	const convertedStr = str
		.replace(/^\s+|\s+$/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9 -]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-');
	return convertedStr;
};

module.exports = {createSlug}