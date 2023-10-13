import Joi from "joi";
// comment's schema
const commentSchema = {
  // comment creation schema
  create() {
    return Joi.object({
        text: Joi.string().required().min(6),
        comment_author_id: Joi.number().required(),
        ticket_id: Joi.number().required()
    });
  },

  // comment update schema
  update() {
    return Joi.object({
        text: Joi.string().allow(null, "")
    });
  },
};
export default commentSchema;
