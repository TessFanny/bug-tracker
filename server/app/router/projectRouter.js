import express from 'express'
const projectRouter =  express.Router();
import projectController from '../controller/projectController.js';
import validation from '../services/joiValidation.js'
import projectSchema from '../schema/projectSchema.js'





// CUSTUM TYPE/SCHEMA
/**
 * A project
 * @typedef {object} Project
  * @property {string} title - 
 * @property {string} description - 
 * @property {number} author_id- 
 * @property {number} bug_id- 
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
projectRouter.get('/projects', projectController.getAllProjects);


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

projectRouter.get('/project/:project_id', projectController.getOneProject);


/**
 * POST /api/projects
 * @summary  crée un  project 
 * @type {Project}
 * @tags projects
 * @security TokenAuth
 * @return {object} 200 - project response
 * @return {object} 500 - Unexpected error
 */

projectRouter.post('/projects', validation.check(projectSchema.create(), "body"), projectController.createProject);

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

projectRouter.patch('/project/:project_id', validation.check(projectSchema.update(), "body"),projectController.updateProject);


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

projectRouter.delete('/project/:project_id', projectController.deleteProject);


export default projectRouter; 