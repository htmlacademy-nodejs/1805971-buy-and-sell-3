'use strict';

const {Router} = require(`express`);
const category = require(`../api/category`);
const search = require(`../api/search`);
const comment = require(`../api/comment`);
const offer = require(`../api/offer`);

const getMockData = require(`../lib/get-mock-data`);

const {
  CategoryService,
  SearchService,
  OfferService,
  CommentService,
} = require(`../data-service`);

const app = new Router();

(async () => {
  const mockData = await getMockData();

  category(app, new CategoryService(mockData));
  search(app, new SearchService(mockData));
  comment(app, new CommentService(mockData));
  offer(app, new OfferService(mockData), new CommentService(mockData));
})();

module.exports = app;
