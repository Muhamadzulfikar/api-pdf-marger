const ResponseError = (res, error) => {
  res.status(error.code).json({
    code: error.code,
    status: error.status,
    message: error.message,
  });
};

module.exports = ResponseError;
