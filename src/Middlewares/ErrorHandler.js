const ErrorHandler = (Error, req, res, next) => {
  res.status(Error.status || 500).send(Error.message);
}

export default ErrorHandler;
