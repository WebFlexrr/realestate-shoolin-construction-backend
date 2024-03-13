const mongoose = require('mongoose');

let conn = null;

const connectDB = async () => {
	try {
		if (conn == null) {
			conn = await mongoose.connect(process.env.MONGO_URI, {
				serverSelectionTimeoutMS: 5000,
			});
			console.log('Creating new connection to the database.....');
			return conn;
		}
		console.log('Connection already established, reusing the connection.....');
	} catch (error) {
		console.log('Mongoose Connection Failed', error);
		process.exit(1);
	}
};

module.exports = { connectDB };
