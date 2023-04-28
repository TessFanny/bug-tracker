import Joi from "joi";
// comment's schema
const commentSchema = {
  // comment creation schema
  create() {
    return Joi.object({
        text: Joi.string().min(15).required(),
        comment_author_id: Joi.number().required(),
        ticket_id: Joi.number().required()
    });
  },

  // comment update schema
  update() {
    return Joi.object({
        text: Joi.string().min(15)
    });
  },
};
export default commentSchema;
