const serverless = require('serverless-http');
const express = require('express');
const { connectDB } = require('./db/db');
const userRouter = require('./routes/user.routes');
const projectRouter = require('./routes/project.routes');
const projectVisitRouter = require('./routes/projectVisit.routes');
const enquiryRouter = require('./routes/enquiry.routes');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
dotenv.config({
	path: './.env',
});

// Exprees Configuration
app.use(
	cors({
		origin: process.env.CORS_ORIGIN,
		credentials: true,
	})
);

app.use(express.json({ limit: '16kb' })); //accept JSON data
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

connectDB()
	.then(
		app.listen(3000, () => {
			console.log('server ON');
			console.log('DB connected');
		})
	)
	.catch((error) => {
		console.log('Mongo db connection failed !!!', error);
	});

// Routes require

//Routes Declaration
app.use('/api/v1/users', userRouter);
app.use('/api/v1/projects', projectRouter);
app.use('/api/v1/enquiry', enquiryRouter);
app.use('/api/v1/projectVisit', projectVisitRouter);

module.exports.handler = serverless(app);
