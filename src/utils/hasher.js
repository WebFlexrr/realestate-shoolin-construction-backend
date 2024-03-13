const bcrypt = require('bcryptjs');
const salt = 10;

const passwordHashed = async (password) => {
	return await bcrypt.hash(password, salt);
};

const passwordCompare = async (enteredPassword, hashedPassword) => {
	return bcrypt.compare(enteredPassword, hashedPassword);
};

module.exports = { passwordHashed, passwordCompare };
