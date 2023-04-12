import express from 'express'
const projectRouter =  express.Router();
import projectController from '../controller/projectController.js';
import validation from '../services/joiValidation.js'
import projectSchema from '../schema/projectSchema.js'
import security from '../services/security.js'; 




// CUSTUM TYPE/SCHEMA
/**
 * A project
 * @typedef {object} Project
* @property {string} title - 
 * @property {string} description - 
 * @property {number} user_id- 
 * 
 */



/**
 * GET /api/projects
 * @summary  renvoie tous les  projects 
 * @type {Project}
 * @tags projects
 * @security TokenAuth
 * @return {object} 200 - projects response
 * @return {object} 500 - Unexpected error
 */
projectRouter.get('/projects',  security.checkToken, security.authMiddleware(['developer','admin']), projectController.getAllProjects);


/**
 * GET /api/project/{project_id}
 * @summary  renvoie un  project selon son id
 * @type {Project}
 * @tags projects
 * @security TokenAuth
 * @param {number} project_id.path.required
 * @return {object} 200 - project response
 * @return {object} 500 - Unexpected error
 */

projectRouter.get('/project/:project_id',  security.checkToken, security.authMiddleware(['developer','admin']), projectController.getOneProject);


/**
 * GET /api/project/{project_id}/users
 * @summary  renvoie un  project selon son id
 * @type {Project}
 * @tags projects
 * @security TokenAuth
 * @param {number} project_id.path.required
 * @return {object} 200 - project response
 * @return {object} 500 - Unexpected error
 */

projectRouter.get('/project/:project_id/users',  security.checkToken, security.authMiddleware(['developer','admin']), projectController.getAllUsersOnProject);

/**
 * POST /api/projects
 * @summary  crée un  project 
 * @type {Project}
 * @tags projects
 * @security TokenAuth
 * @return {object} 200 - project response
 * @return {object} 500 - Unexpected error
 */

projectRouter.post('/projects',  security.checkToken, security.authMiddleware(['developer','admin']), validation.check(projectSchema.create(), "body"), projectController.createProject);

/**
 * POST /api/project/{project_id}/users
 * @summary  assigner des utilisateur à un projet
 * @type {Project}
 * @tags projects
 * @security TokenAuth
 *  @param {number} project_id.path.required
 * @return {object} 200 - project response
 * @return {object} 500 - Unexpected error
 */

projectRouter.post('/project/:project_id/users',  security.checkToken, security.authMiddleware(['developer','admin']), projectController.assignUserToProject);

/**
 * PATCH /api/project/{project_id}
 * @summary  modifie un  project selon son id
 * @type {Project}
 * @tags projects
 * @security TokenAuth
 * @param {number} project_id.path.required
 * @return {object} 200 - project response
 * @return {object} 500 - Unexpected error
 */

projectRouter.patch('/project/:project_id',  security.checkToken, security.authMiddleware(['developer','admin']), validation.check(projectSchema.update(), "body"),projectController.updateProject);


/**
 * delete /api/project/{project_id}
 * @summary  supprime un  project selon son id
 * @type {Project}
 * @tags projects
 * @security TokenAuth
 * @param {number} project_id.path.required
 * @return {object} 200 - project response
 * @return {object} 500 - Unexpected error
 */

projectRouter.delete('/project/:project_id',  security.checkToken, security.authMiddleware(['developer','admin']), projectController.deleteProject);


export default projectRouter; 