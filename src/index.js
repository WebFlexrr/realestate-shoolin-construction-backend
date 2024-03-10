const serverless = require('serverless-http');
const express = require('express');
const connectDB = require('./db/db');
const Enquiry = require('./models/enquiry.models');

const dotenv  = require('dotenv');
const app = express();
dotenv.config();
connectDB();

app.use(express.json()); //accept JSON data

app.post('/form', async (req, res) => {
	const { name, email, number, message } = req.body;
	console.log(req.body);
	try {
		const user = await Enquiry.create({ name, email, number,message });
		console.log(user)
		res.status(201).json(user);

	} catch (error) {
		res.status(400);
		return error;
	}
});

app.use("/api/user",userRoutes)


// app.listen(3000, () => {
// 	console.log('server ON');
// });

module.exports.handler = serverless(app);
