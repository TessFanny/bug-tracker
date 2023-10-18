import express from 'express'
import ticketController from '../controller/ticketController.js';
import validation from '../services/joiValidation.js'
import ticketSchema from '../schema/ticketSchema.js'
import security from '../services/security.js'; 
const ticketRouter =  express.Router();




// CUSTUM TYPE/SCHEMA
/**
 * A ticket
 * @typedef {object} Ticket
 * @property {string} title - 
 * @property {string} description - 
 * @property {string} ticket_status- 
 * @property {string} priority -
 * @property {string} color - 
 * @property {string} created_by - 
 * @property {string} project_id - 
 * 
 */



/**
 * GET /api/tickets
 * @summary  renvoie tous les  tickets 
 * @type {Ticket}
 * @tags tickets
 * @security TokenAuth
 * @return {object} 200 - tickets response
 * @return {object} 500 - Unexpected error
 */
ticketRouter.get('/tickets',  security.checkToken, security.authMiddleware(["developer", "admin", "project manager"]), ticketController.getAllTickets);




/**
 * GET /api/tickets/{project_id}
 * @summary  renvoie tous les  tickets d'un projet 
 * @type {Ticket}
 * @tags tickets
 * @security TokenAuth
 * @return {object} 200 - tickets response
 * @return {object} 500 - Unexpected error
 */
ticketRouter.get('/tickets/:project_id', security.checkToken, security.authMiddleware(["developer", "admin", "project manager"]), ticketController.getAllTicketsByProject);


/**
 * GET /api/tickets/{user_id}
 * @summary 
 * @type {Ticket}
 * @tags tickets
 * @security TokenAuth
* @param {number} user_id.path.required
 * @return {object} 200 - tickets response
 * @return {object} 500 - Unexpected error
 */
ticketRouter.get('/tickets/users/:user_id',  security.checkToken, security.authMiddleware(["developer", "admin", "project manager"]), ticketController.getTicketsUserIsAssignedTo);


/**
 * GET /api/ticket/{ticket_id}
 * @summary  
 * @type {Ticket}
 * @tags tickets
 * @security TokenAuth
 * @param {number} ticket_id.path.required
 * @return {object} 200 - ticket response
 * @return {object} 500 - Unexpected error
 */

ticketRouter.get('/ticket/:ticket_id', security.checkToken, security.authMiddleware(["developer", "admin", "project manager"]), ticketController.getOneTicket);

/**
 * GET /api/ticket/{ticket_id}/users
 * @summary  
 * @type {Ticket}
 * @tags tickets
 * @security TokenAuth
 * @param {number} ticket_id.path.required
 * @return {object} 200 - ticket response
 * @return {object} 500 - Unexpected error
 */

ticketRouter.get('/ticket/:ticket_id/users', security.checkToken, ticketController.getAllUsersOnTicket);

/**
 * POST /api/tickets
 * @summary  create a ticket
 * @type {Ticket}
 * @tags tickets
 * @security TokenAuth
 * @return {object} 200 - ticket response
 * @return {object} 500 - Unexpected error
 */

ticketRouter.post('/tickets',  security.checkToken, validation.check(ticketSchema.create(), "body"), ticketController.createTicket);




/**
 * POST /api/ticket/{ticket_id}/users
 * @summary  assign ticket to user 
 * @type {Ticket}
 * @tags tickets
 * @security TokenAuth
 * @return {object} 200 - ticket response
 * @return {object} 500 - Unexpected error
 */

ticketRouter.post('/ticket/:ticket_id/users',  security.checkToken, security.authMiddleware(['developer','admin']), ticketController.assignUserToTicket);

/**
 * PATCH /api/ticket/{ticket_id}
 * @summary 
 * @type {Ticket}
 * @tags tickets
 * @security TokenAuth
 * @param {number} ticket_id.path.required
 * @return {object} 200 - ticket response
 * @return {object} 500 - Unexpected error
 */

ticketRouter.patch('/ticket/:ticket_id',  security.checkToken, security.authMiddleware(['admin', "project manager"]), validation.check(ticketSchema.update(), "body"),ticketController.updateTicket);


/**
 * delete /api/ticket/{ticket_id}/{user_id}
 * @summary  delete an user assigned to a ticket
 * @type {Ticket}
 * @tags tickets
 * @security TokenAuth
 * @param {number} ticket_id.path.required
 * @return {object} 200 - ticket response
 * @return {object} 500 - Unexpected error
 */

ticketRouter.delete('/ticket/:ticket_id/:user_id',  security.checkToken, security.authMiddleware(['project manager','admin']), ticketController.deleteUserFromTicket);

/**
 * delete /api/ticket/{ticket_id}
 * @summary 
 * @type {Ticket}
 * @tags tickets
 * @security TokenAuth
 * @param {number} ticket_id.path.required
 * @return {object} 200 - ticket response
 * @return {object} 500 - Unexpected error
 */

ticketRouter.delete('/ticket/:ticket_id',  security.checkToken, security.authMiddleware(['project manager','admin']), ticketController.deleteTicket);


export default ticketRouter; 