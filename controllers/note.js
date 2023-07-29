const noteRouter = require("express").Router();
const Note = require("../models/note");

noteRouter.get("/", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

noteRouter.get("/:id", (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) response.json(note);
      else
        response
          .status(404)
          .send({ error: `note with id ${request.params.id} not found` });
    })
    .catch((error) => next(error));
});

noteRouter.post("/", (request, response, next) => {
  const body = request.body;

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note
    .save()
    .then((savedNote) => {
      response.status(201).json(savedNote);
    })
    .catch((error) => next(error));
});

noteRouter.delete("/:id", (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

noteRouter.put("/:id", (request, response, next) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(request.params.id, note, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedNote) => response.json(updatedNote))
    .catch((error) => next(error));
});

module.exports = noteRouter;
