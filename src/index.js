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
const corsConfig = {
	origin: process.env.ADMIN_FRONTEND_URL,
	credentials: true,
	
};
app.use(cors(corsConfig));
var allowedDomains = [process.env.FRONTEND_URL, process.env.ADMIN_FRONTEND_URL];
// app.use(
// 	cors({
// 		origin: function (origin, callback) {
// 			// bypass the requests with no origin (like curl requests, mobile apps, etc )
// 			if (!origin) return callback(null, true);

// 			if (allowedDomains.indexOf(origin) === -1) {
// 				var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
// 				return callback(new Error(msg), false);
// 			}
// 			return callback(null, true);
// 		},
// 	})
// );

app.use(express.json({ limit: '16kb' })); //accept JSON data
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

const PORT = process.env.PORT || 4000;
connectDB()
	.then(
		app.listen(PORT, () => {
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
