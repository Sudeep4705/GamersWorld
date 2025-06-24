const Joi = require('joi');
const Review = require('./models/review');


module.exports.listingSchema = Joi.object({
    listing:Joi.object({
        Name:Joi.string().required(),
        description:Joi.string().required(),
        image:Joi.string().required(),
        gamename:Joi.string().required(),
        location:Joi.string().required(),
        networth:Joi.string().required()


    }).required()
});

module.exports.reviewSchema = Joi.object({
    review:Joi.object(
        {
comment:Joi.string().required(),
Rating:Joi.string().min(1).max(5).required()
        }
    ).required()
})