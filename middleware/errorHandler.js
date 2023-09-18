const { constants } = require("../constants");

const errorHandler = (err, req, resp, next) => {
  const statusCode = resp.statusCode ? resp.statusCode : 500;

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      resp.json({
        title: "Validation Failed",
        message: err.message,
        stacktrace: err.stack,
      });
      break;
    case constants.NOT_FOUND:
      resp.json({
        title: "Not Found",
        message: err.message,
        stacktrace: err.stack,
      });
      break;
    case constants.UNAUTHORIZED:
      resp.json({
        title: "un authorized",
        message: err.message,
        stacktrace: err.stack,
      });
      break;
    case constants.FORBIDDEN:
      resp.json({
        title: "forbidden error",
        message: err.message,
        stacktrace: err.stack,
      });
      break;
    case constants.SERVER_ERROR:
      resp.json({
        title: "server error",
        message: err.message,
        statustrace: err.stack,
      });
    default:
      console.log("no error, all good");
      break;
  }
};

module.exports = errorHandler;
