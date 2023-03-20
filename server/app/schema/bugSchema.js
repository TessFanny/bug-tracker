import Joi from "joi";
// bug's schema
const bugSchema = {
  // bug creation schema
  create() {
    return Joi.object({
      title: Joi.string().max(30).required(),
      description: Joi.string().required(),
      status: Joi.string().required(),
      priority: Joi.string().min(6).max(30).required(),
      color: Joi.string().min(6).max(30).required(),
      created_by: Joi.number().required(),
    });
  },

  // bug update schema
  update() {
    return Joi.object({
      title: Joi.string().max(30),
      description: Joi.string(),
      status: Joi.string(),
      priority: Joi.string().min(6).max(30),
      color: Joi.string().min(6).max(30),
      created_by: Joi.number(),
    });
  },
};
export default bugSchema;
