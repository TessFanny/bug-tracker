
import express from 'express'
const userRouter =  express.Router();

import userController from '../controller/userController.js';
import security from '../services/security.js'; 
import validation from '../services/joiValidation.js';
import userSchema from '../schema/userSchema.js'




// CUSTUM TYPE/SCHEMA
/**
 * A user
 * @typedef {object} User
 * @property {string} firstname - prénom
 * @property {string} lastname - nom
 * @property {string} email- email
 * @property {string} password - mot de passe 
 * 
 */



/**
 * GET /api/users
 * @summary  renvoie tous les  utilisateurs 
 * @type {User}
 * @tags User
 * @security TokenAuth
 * @return {object} 200 - users response
 * @return {object} 500 - Unexpected error
 */
userRouter.get('/users',  security.checkToken, security.authMiddleware(["developer", "admin", "project manager"]), userController.getAllUsers); 

/**
 * GET /api/user/{user_id}
 * @summary  renvoie un utilisateur selon son id 
 * @type {User}
 * @tags User
 * @security TokenAuth
 * @param {number} user_id.path.required - id utilisateur  en entrée
 * @return {object} 200 - user response
 * @return {object} 500 - Unexpected error
 */
userRouter.get('/user/:user_id',  security.checkToken, security.authMiddleware(["developer", "admin", "project manager"]), userController.getOneUser); 

/**
 * PATCH /api/user/{user_id}
 * @summary  permet de supprimer un utilisateur
 * @type {User}
 * @tags User
 * @security TokenAuth
 *  @param {number} user_id.path.required - id utilisateur en entrée
 * @return {object} 200 - user response
 * @return {object} 500 - Unexpected error
 */
userRouter.patch('/user/:user_id',  security.checkToken, security.authMiddleware(["developer", "admin", "project manager"]), validation.check(userSchema.userUpdate(), "body"), userController.updateUser); 


/**
 * DELETE /api/user/{user_id}
 * @summary  permet de  modifier les données d'un utilisateur
 * @type {User}
 * @tags User
 * @security TokenAuth
 *  @param {number} user_id.path.required - id utilisateur en entrée
 * @return {object} 200 - user response
 * @return {object} 500 - Unexpected error
 */
userRouter.delete('/user/:user_id' ,  security.checkToken, security.authMiddleware(['admin']), userController.deleteUser); 

export default userRouter; 



