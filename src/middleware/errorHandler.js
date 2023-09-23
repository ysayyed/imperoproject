const errorHandler = (error, req, res, next) => {
	res.status(error.status || 500).json({
		status: error.status || 500,
		error: error.message.split(',') || "Internal Serval error",
		path: req.path,
		timestamp: new Date().toISOString()
	})

}

export default errorHandler