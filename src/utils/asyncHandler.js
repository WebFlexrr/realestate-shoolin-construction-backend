const asyncHandler = (handler) => async (req, res, next) => {
	try {
		await handler(req, res, next);
	} catch (error) {
		res.status(error.code || 5000).json({
			success: false,
			message: error.message,
		});
	}
};

module.exports = { asyncHandler };
