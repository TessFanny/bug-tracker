import Joi from "joi";
// comment's schema
const commentSchema = {
  // comment creation schema
  create() {
    return Joi.object({
        title: Joi.string().max(30).required(),
        text: Joi.string().min(15).required(),
        user_id: Joi.number().required(),
        ticket_id: Joi.number().required()
    });
  },

  // comment update schema
  update() {
    return Joi.object({
        title: Joi.string().max(30),
        text: Joi.string().min(15),
        user_id: Joi.number(),
        ticket_id: Joi.number()
    });
  },
};
export default commentSchema;
