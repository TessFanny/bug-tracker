import express from 'express'
const commentRouter =  express.Router();
import commentController from '../controller/commentController.js';
import validation from '../services/joiValidation.js'
import commentSchema from '../schema/commentSchema.js'





// CUSTUM TYPE/SCHEMA
/**
 * A comment
 * @typedef {object} Comment
 * @property {string} title - 
 * @property {string} text - 
 * @property {number} bug_id- 
 * @property {number} user_id-
 * 
 */



/**
 * GET /api/comments
 * @summary  renvoie tous les  comments 
 * @type {Comment}
 * @tags comments
 * @security TokenAuth
 * @return {object} 200 - comments response
 * @return {object} 500 - Unexpected error
 */
commentRouter.get('/comments', commentController.getAllComments);


/**
 * GET /api/comment/{comment_id}
 * @summary  renvoie un  comment selon son id
 * @type {Comment}
 * @tags comments
 * @security TokenAuth
 * @param {number} comment_id.path.required
 * @return {object} 200 - comment response
 * @return {object} 500 - Unexpected error
 */

commentRouter.get('/comment/:comment_id', commentController.getOneComment);


/**
 * POST /api/comments
 * @summary  crée un  comment 
 * @type {Comment}
 * @tags comments
 * @security TokenAuth
 * @return {object} 200 - comment response
 * @return {object} 500 - Unexpected error
 */

commentRouter.post('/comments', validation.check(commentSchema.create(), "body"), commentController.createComment);

/**
 * PATCH /api/comment/{comment_id}
 * @summary  modifie un  comment selon son id
 * @type {Comment}
 * @tags comments
 * @security TokenAuth
 * @param {number} comment_id.path.required
 * @return {object} 200 - comment response
 * @return {object} 500 - Unexpected error
 */

commentRouter.patch('/comment/:comment_id', validation.check(commentSchema.update(), "body"),commentController.updateComment);


/**
 * delete /api/comment/{comment_id}
 * @summary  supprime un  comment selon son id
 * @type {Comment}
 * @tags comments
 * @security TokenAuth
 * @param {number} comment_id.path.required
 * @return {object} 200 - comment response
 * @return {object} 500 - Unexpected error
 */

commentRouter.delete('/comment/:comment_id', commentController.deleteComment);




export default commentRouter; 