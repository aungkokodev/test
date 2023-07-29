const morgan = require("morgan");
const logger = require("./logger");

morgan.token("body", (req, res) => JSON.stringify(req.body));

const requestLogger = morgan(
  ":method :url :status - :response-time ms - :res[content-length] - :body - :req[content-length]"
);

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    response.status(400).send({ error: error.message });
  }
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
