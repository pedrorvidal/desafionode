const express = require("express");
const cors = require("cors");
const { v4: uuid_v4 } = require('uuid');

// const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

// * Done!
app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

// * Done!
app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repository = {
    id: uuid_v4(),
    title, 
    url, 
    techs,
    likes: 0,
  }
  repositories.push(repository);

  return response.json(repository);
});

// * Done!
app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { url, title, techs } = request.body;

  const repoIndex = repositories.findIndex(repository => repository.id === id);

  if (repoIndex < 0 ) {
    return response.status(400).json({ error: 'repo does not exist'});
  }
  const repo = {
    id, 
    url, 
    title, 
    techs,
    likes: repositories[repoIndex].likes,
  }
  repositories[repoIndex] = repo;
  return response.json(repo);
});

// * Done!
app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repoIndex = repositories.findIndex(repository => repository.id === id);
  if (repoIndex < 0) {
    return response.status(400).send();
  }
  repositories.splice(repoIndex, 1);
  return response.status(204).send();
});

// * Done!
app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repoIndex = repositories.findIndex(repository => repository.id === id);
  if (repoIndex === -1) {
    return response.status(400).json({ error: 'Repo does not exist.' });
  }
  repositories[repoIndex].likes++;
  return response.json(repositories[repoIndex]);
});

module.exports = app;
