import express from 'express'
import bugController from '../controller/bugController.js';
import validation from '../services/joiValidation.js'
import bugSchema from '../schema/bugSchema.js'
const bugRouter =  express.Router();




// CUSTUM TYPE/SCHEMA
/**
 * A bug
 * @typedef {object} Bug
 * @property {string} title - 
 * @property {string} description - 
 * @property {string} status- 
 * @property {string} priority -
 * @property {string} color - 
 * @property {string} created_by - 
 * 
 */



/**
 * GET /api/bugs
 * @summary  renvoie tous les  bugs 
 * @type {Bug}
 * @tags bugs
 * @security TokenAuth
 * @return {object} 200 - bugs response
 * @return {object} 500 - Unexpected error
 */
bugRouter.get('/bugs', bugController.getAllBugs);


/**
 * GET /api/bug/{bug_id}
 * @summary  renvoie un  bug selon son id
 * @type {Bug}
 * @tags bugs
 * @security TokenAuth
 * @param {number} bug_id.path.required
 * @return {object} 200 - bug response
 * @return {object} 500 - Unexpected error
 */

bugRouter.get('/bug/:bug_id', bugController.getOneBug);


/**
 * POST /api/bugs
 * @summary  crée un  bug 
 * @type {Bug}
 * @tags bugs
 * @security TokenAuth
 * @return {object} 200 - bug response
 * @return {object} 500 - Unexpected error
 */

bugRouter.post('/bugs', validation.check(bugSchema.create(), "body"), bugController.createBug);

/**
 * PATCH /api/bug/{bug_id}
 * @summary  modifie un  bug selon son id
 * @type {Bug}
 * @tags bugs
 * @security TokenAuth
 * @param {number} bug_id.path.required
 * @return {object} 200 - bug response
 * @return {object} 500 - Unexpected error
 */

bugRouter.patch('/bug/:bug_id', validation.check(bugSchema.update(), "body"),bugController.updateBug);


/**
 * delete /api/bug/{bug_id}
 * @summary  supprime un  bug selon son id
 * @type {Bug}
 * @tags bugs
 * @security TokenAuth
 * @param {number} bug_id.path.required
 * @return {object} 200 - bug response
 * @return {object} 500 - Unexpected error
 */

bugRouter.delete('/bug/:bug_id', bugController.deleteBug);


export default bugRouter; 