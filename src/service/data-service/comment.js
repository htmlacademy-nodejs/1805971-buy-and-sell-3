'use strict';

const {nanoid} = require(`nanoid`);

const MAX_ID_LENGTH = 6;

class CommentService {
  constructor(offers) {
    this._offers = offers;
  }

  findAll(offerId) {
    if (offerId) {
      const offer = this._offers.find((item) => item.id === offerId);
      const offerComments = offer.comments.reduce((acc, item) => {
        acc.push(item.text);
        return acc;
      }, []);

      return offerComments;
    }

    return this._offers.map((item)=> item.comments);
  }

  findOne(offerId, commentId) {
    const offer = this._offers.find((item) => item.id === offerId);
    return offer.comments.find((item) => item.id === commentId);
  }

  create(offerId, {text}) {
    const newComment = Object
      .assign({id: nanoid(MAX_ID_LENGTH), text});

    const offer = this._offers.find((item) => item.id === offerId);
    offer.comments.push(newComment);

    return newComment;
  }

  drop(offerId, commentId) {
    const offer = this._offers.find((item) => item.id === offerId);

    if (!offer) {
      return null;
    }

    const comment = offer.comments.find((item) => item.id === commentId);

    if (!comment) {
      return null;
    }

    offer.comments = offer.comments.filter((item)=> item.id !== commentId);

    return comment;
  }
}

module.exports = CommentService;
