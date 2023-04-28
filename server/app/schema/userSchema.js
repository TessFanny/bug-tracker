
import Joi from 'joi'
// user's schema
const userSchema = {

    // user registration schema
    register(){
        return Joi.object({ 
            firstname: Joi.string().max(30).required(), 
            lastname: Joi.string().required(), 
            email: Joi.string().email().required(), 
            password: Joi.string().min(6).max(30).required(), 
            passwordConfirm: Joi.string().min(6).max(30).required(),        
        });
    },

    // user login schema
    login(){
        return Joi.object({            
            email: Joi.string().email().required(), 
            password: Joi.string().min(5).max(30).required()           
        });
    },

    // user update schema
     userUpdate(){
       return  Joi.object({
                firstname: Joi.string().allow("", null), 
                lastname: Joi.string().allow("", null), 
                email: Joi.string().email().allow("", null),               
                role: Joi.string().allow("", null)               
            })
     },

}
export default userSchema