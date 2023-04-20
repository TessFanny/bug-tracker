import Joi from "joi";
// project's schema
const projectSchema = {
  // project creation schema
  create() {
    return Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      author_id: Joi.number().required(),      
    });
  },

  // project update schema
  update() {
    return Joi.object({
        title: Joi.string().max(30),
        description: Joi.string().min(15),
        author_id: Joi.number(),        
    });
  },
};
export default projectSchema;