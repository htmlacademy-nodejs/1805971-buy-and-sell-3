'use strict';

const {Router} = require(`express`);
const fs = require(`fs`).promises;

const FILENAME = `mocks.json`;
const {HttpCode} = require(`../../../constants`);

const offersRouter = new Router();

offersRouter.get(`/`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILENAME);
    const mocks = JSON.parse(fileContent);
    res.json(mocks);
  } catch (err) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(err);
  }
});

module.exports = offersRouter;
