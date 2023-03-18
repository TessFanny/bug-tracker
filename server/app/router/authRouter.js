import express from 'express'
import authController from '../controller/authController.js';
const authRouter =  express.Router();





// CUSTUM TYPE/SCHEMA
/**
 * A user
 * @typedef {object} UserRegistered
 * @property {string} firstname.required - prénom
 * @property {string} lastname.required - nom
 * @property {string} email.required - email
 * @property {string} password.required - mot de passe
 * @property {string} passwordConfirm.required - confirmation de mot de passe 
 * 
 */



/**
 * POST /api/register
 * @summary  permet à un utilisateur de s'enregistrer
 * @type {UserRegistered}
 * @tags User
 * @param {UserRegistered} request.body.require - infos sur l'utilisateur enregistré 
 * @return {object} 200 - user response
 * @return {object} 500 - Unexpected error
 */
authRouter.post('/register', authController.register)



// CUSTUM TYPE/SCHEMA
/**
 * A user
 * @typedef {object} UserLogged
 * @property {string} email - email
 * @property {string} password - mot de passe
 * 
 */


/**
 * POST /api/login
 * @summary  permet à un utilisateur de se conencter
 * @type {UserLogged}
 * @tags User
 * @param {UserLogged} request.body.require - infos sur  l'utilisateur enregistré 
 * @return {object} 200 - user response
 * @return {object} 500 - Unexpected error
 */
authRouter.post('/login', authController.login)

export default authRouter;