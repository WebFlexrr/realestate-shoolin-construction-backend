
const bcrypt = require('bcrypt');
const salt = 4;

module.exports = passwordHashed = async (password) => {
	return await bcrypt.hash(password, salt);
};


module.exports = passwordCompare = async (enteredPassword, hashedPassword) => {
	return bcrypt.compare(enteredPassword, hashedPassword);
};
