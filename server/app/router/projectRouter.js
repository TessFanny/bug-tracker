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
 * @property {number} author_id- 
 * @property {number} ticket_id- 
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

projectRouter.get('/project/:project_id', security.isConnected, security.checkToken, security.authMiddleware(['developer','admin']), projectController.getOneProject);


/**
 * POST /api/projects
 * @summary  crée un  project 
 * @type {Project}
 * @tags projects
 * @security TokenAuth
 * @return {object} 200 - project response
 * @return {object} 500 - Unexpected error
 */

projectRouter.post('/projects', security.isConnected, security.checkToken, security.authMiddleware(['developer','admin']), validation.check(projectSchema.create(), "body"), projectController.createProject);

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

projectRouter.patch('/project/:project_id', security.isConnected, security.checkToken, security.authMiddleware(['developer','admin']), validation.check(projectSchema.update(), "body"),projectController.updateProject);


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

projectRouter.delete('/project/:project_id', security.isConnected, security.checkToken, security.authMiddleware(['developer','admin']), projectController.deleteProject);


export default projectRouter; 