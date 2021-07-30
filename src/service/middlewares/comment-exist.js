'use strict';

const {HttpCode} = require(`../../constants`);

module.exports = (service) => async (req, res, next) => {
  const {offerId, commentId} = req.params;
  const comment = await service.findOne(offerId, commentId);

  if (!comment) {
    return res.status(HttpCode.NOT_FOUND)
      .send(`Comment with ${commentId} not found`);
  }

  return next();
};
