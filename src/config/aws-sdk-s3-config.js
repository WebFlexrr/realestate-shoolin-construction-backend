const { S3Client } = require('@aws-sdk/client-s3');

console.log('sdk client', {
	region: process.env.REGION,
	accessKeyId: process.env.ACCESS_KEY_ID,
	secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const s3Client = new S3Client({
	region: process.env.REGION,
	credentials: {
		accessKeyId: process.env.ACCESS_KEY_ID,
		secretAccessKey: process.env.SECRET_ACCESS_KEY,
	},
});

module.exports = { s3Client };
