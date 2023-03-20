
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
userRouter.get('/users', security.isConnected, security.checkToken, security.authMiddleware(['developer','admin']), userController.getAllUsers); 

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
userRouter.get('/user/:user_id', security.isConnected, security.checkToken, security.authMiddleware(['admin']), userController.getOneUser); 

/**
 * PATCH /api/user/{user_id}
 * @summary  permet de  modifier les données d'un utilisateur
 * @type {User}
 * @tags User
 * @security TokenAuth
 *  @param {number} user_id.path.required - id utilisateur en entrée
 * @return {object} 200 - user response
 * @return {object} 500 - Unexpected error
 */
userRouter.patch('/user/:user_id', security.isConnected, security.checkToken, security.authMiddleware([]), validation.check(userSchema.userUpdate(), "body"), userController.updateUser); 


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
userRouter.delete('/user/:user_id' , security.isConnected, security.checkToken, security.authMiddleware([]), userController.deleteUser); 

export default userRouter; 



// import express from 'express';
// import auth from '../service/security.js';
// import controller from '../controllers/index.js';
// import validation from '../service/validation.js';
// import schemaUser from '../schemas/userBody.js';
// import schemaHasTag from '../schemas/hasTagBody.js';

// const router = express.Router();

// // Routes des membres
// router.get('/users', auth.authMiddleware(['staff', 'admin']), controller.usersController.getAll);
// router.get('/user/:id', auth.authMiddleware(['membre', 'staff', 'admin']), controller.usersController.getUser);
// router.patch('/user/:id', auth.authMiddleware(['membre', 'staff', 'admin']), validation.check(schemaUser.update(),"body"), controller.usersController.updateUser);
// router.delete('/user/:id', auth.authMiddleware(['membre', 'staff', 'admin']), controller.usersController.deleteUser);

// // Routes admin/staff
// router.get('/admin/user/:id', auth.authMiddleware(['staff', 'admin']), controller.usersController.adminGetUser);
// router.patch('/admin/user/:id', auth.authMiddleware(['admin']), validation.check(schemaUser.updateAdmin(),"body"), controller.usersController.adminUpdateUser);
// router.delete('/admin/user/:id', auth.authMiddleware(['admin']), controller.usersController.adminDeleteUser);

// // Routes de la relation USER_HAS_TAG
// router.get('/user/:id/tag', auth.authMiddleware(['membre', 'staff', 'admin']), controller.usersController.getUserTags);
// router.post('/user/:id/tag', auth.authMiddleware(['membre', 'staff', 'admin']), validation.check(schemaHasTag.addTag(),"body"), controller.usersController.addUserTag);
// router.delete('/user/:id/tag/:tagId', auth.authMiddleware(['membre', 'staff', 'admin']), controller.usersController.deleteUserTag);

// // Route du matching de tous les animaux
// router.get('/user/:id/matching', auth.authMiddleware(['membre', 'staff', 'admin']), controller.usersController.matching);

// // Route du matching d'un animal
// router.get('/user/:id/matching/:animalId', auth.authMiddleware(['membre', 'staff', 'admin']), controller.usersController.matchingOne);

// export default router;