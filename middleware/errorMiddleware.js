function notFound(req, res, next) {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404).json({
    status: 404,
    message: error.message
  });
  next(error);
}




module.exports = { notFound };