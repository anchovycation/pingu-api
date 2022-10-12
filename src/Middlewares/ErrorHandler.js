const ErrorHandler = (error, req, res, next) => {
  res.status(error.status || 500).send(error.message);
}

export default ErrorHandler;
