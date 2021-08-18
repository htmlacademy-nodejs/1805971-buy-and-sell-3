'use strict';

const {Router} = require(`express`);

const {HttpCode} = require(`../../constants`);
const offerValidator = require(`../middlewares/offer-validator`);
const offerExist = require(`../middlewares/offer-exists`);
const commentValidator = require(`../middlewares/comment-validator`);
const commentExist = require(`../middlewares/comment-exist`);

const route = new Router();

module.exports = (app, offerService, commentService) => {
  app.use(`/offers`, route);

  route.get(`/`, async (req, res) => {
    const offers = await offerService.findAll();

    res.status(HttpCode.OK)
      .json(offers);
  });

  route.post(`/`, offerValidator, (req, res) => {
    const offer = offerService.create(req.body);

    return res.status(HttpCode.CREATED)
      .json(offer);
  });

  route.put(`/:offerId`, [offerValidator, offerExist(offerService)], (req, res) => {
    const {offerId} = req.params;
    const offer = offerService.update(offerId, req.body);

    return res.status(HttpCode.OK)
      .json(offer);
  });

  route.delete(`/:offerId`, offerExist(offerService), (req, res) => {
    const {offerId} = req.params;
    const offer = offerService.drop(offerId);

    return res.status(HttpCode.OK)
      .json(offer);
  });

  route.get(`/:offerId`, offerExist(offerService), (req, res) => {
    const {offerId} = req.params;
    const offer = offerService.findOne(offerId);

    if (!offer) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found with ${offerId}`);
    }

    return res.status(HttpCode.OK)
      .json(offer);
  });

  route.get(`/:offerId/comments`, offerExist(offerService), async (req, res) => {
    const {offerId} = req.params;
    const comment = await commentService.findAll(offerId);

    return res.status(HttpCode.OK)
      .json(comment);
  });

  route.post(`/:offerId/comments`, [offerExist(offerService), commentValidator], async (req, res) => {
    const {offerId} = req.params;
    const comment = await commentService.create(offerId, req.body);

    return res.status(HttpCode.CREATED)
      .json(comment);
  });

  route.delete(`/:offerId/comments/:commentId`, [offerExist(offerService), commentExist(commentService), commentValidator], async (req, res) => {
    const {offerId, commentId} = req.params;
    const comment = await commentService.drop(offerId, commentId);

    return res.status(HttpCode.OK)
      .json(comment);
  });
};
