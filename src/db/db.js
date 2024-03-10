const { configDotenv } = require('dotenv');
const mongoose = require('mongoose');

let conn = null;

module.exports = connectDB = async () => {
	
	if (conn == null) {
		conn = await mongoose.connect(process.env.MONGO_URI, {
			serverSelectionTimeoutMS: 10000,
		});
		console.log('Creating new connection to the database.....');
		return conn;
	}

	console.log('Connection already established, reusing the connection.....');
};
