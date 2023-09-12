import Joi from "joi";
// ticket's schema
const ticketSchema = {
  // ticket creation schema
  create() {
    return Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      ticket_status: Joi.required(),
      priority: Joi.required(),
      color: Joi.string().max(30).required(),
      type: Joi.string().max(30).required(),
      ticket_author_id: Joi.number(),
      project_id: Joi.number()
    });
  },

  // ticket update schema
  update() {
    return Joi.object({
      title: Joi.string(),
      description: Joi.string(),
      ticket_status: Joi.string(),
      priority: Joi.string(),
      color: Joi.string(),
      type: Joi.string(),
      ticket_author_id: Joi.number(),
      project_id: Joi.number()
    });
  },
};
export default ticketSchema;
