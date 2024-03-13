const asyncHandler = (handler) => (req, res, next) => {
	try {
		return handler(req, res, next);
	} catch (error) {
		res.status(error.code || 5000).json({
			success: false,
			message: error.message,
		});
		next(error);
	}
};

module.exports = { asyncHandler };
