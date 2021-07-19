'use strict';

const express = require(`express`);

const {HttpCode} = require(`../../constants`);
const offersRoutes = require(`./routes/offers-routes`);

const DEFAULT_PORT = 3000;

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    const app = express();
    app.use(express.json());

    app.use(`/offers`, offersRoutes);

    app.use((req, res) => res
      .status(HttpCode.NOT_FOUND)
      .send(`Not found`));

    app.listen(port);
  }
};
