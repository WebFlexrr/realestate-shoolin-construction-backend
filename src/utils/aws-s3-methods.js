const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { s3Client } = require('../config/aws-sdk-s3-config');

const getObjectUrl = async (key) => {
	const command = new GetObjectCommand({
		Bucket: process.env.AWS_S3_BUCKET_NAME,
		Key: key,
	});

	try {
		const url = await getSignedUrl(s3Client, command);
		return url;
	} catch (error) {
		return error.message;
	}
};

const putObjectUrl = async (path, filename, contentType) => {
	// const command = new PutObjectCommand({
	// 	Bucket: process.env.AWS_S3_BUCKET_NAME,
	// 	Key: `${path}/${filename}`,
	// 	ContentType: contentType,
	// });

	// const response = await s3Client.send(command);

	// return response;

	const command = new PutObjectCommand({
		Bucket: process.env.AWS_S3_BUCKET_NAME,
		Key: `${path}/${filename}`,
		ContentType: contentType,
	});

	const url = await getSignedUrl(s3Client, command);
	return url;
};

module.exports = { getObjectUrl, putObjectUrl };
