const serverless = require('serverless-http');
const express = require('express');
const {connectDB} = require('./db/db');
const userRoutes = require('./routes/user.routes');
const projectRoutes = require('./routes/project.routes');
const enquiryRoutes = require('./routes/enquiry.routes');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
dotenv.config();

// Exprees Configuration
app.use(
	cors({
		origin: process.env.CORS_ORIGIN,
		credentials: true,
	})
);

app.use(express.json({ limit: '16kb' })); //accept JSON data
app.use(express.urlencoded());
app.use(express.static('public'));
app.use(cookieParser());

connectDB()
	.then()
	.catch((error) => {
		console.log('Mongo db connection failed !!!', error);
	});

app.use('/api/users', userRoutes);
// app.use('/api/project', projectRoutes);
// app.use('/api/enquiry', enquiryRoutes);

app.listen(3000, () => {
	console.log('server ON');
});
// module.exports.handler = serverless(app);
