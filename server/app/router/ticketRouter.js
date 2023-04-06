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
 * @property {string} status- 
 * @property {string} priority -
 * @property {string} color - 
 * @property {string} created_by - 
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
ticketRouter.get('/tickets',  security.checkToken, security.authMiddleware(['developer','admin']), ticketController.getAllTickets);


/**
 * GET /api/ticket/{ticket_id}
 * @summary  renvoie un  ticket selon son id
 * @type {Ticket}
 * @tags tickets
 * @security TokenAuth
 * @param {number} ticket_id.path.required
 * @return {object} 200 - ticket response
 * @return {object} 500 - Unexpected error
 */

ticketRouter.get('/ticket/:ticket_id', security.checkToken, security.authMiddleware(['developer','admin']), ticketController.getOneTicket);


/**
 * POST /api/tickets
 * @summary  crée un  ticket 
 * @type {Ticket}
 * @tags tickets
 * @security TokenAuth
 * @return {object} 200 - ticket response
 * @return {object} 500 - Unexpected error
 */

ticketRouter.post('/tickets',  security.checkToken, security.authMiddleware(['developer','admin']), validation.check(ticketSchema.create(), "body"), ticketController.createTicket);

/**
 * PATCH /api/ticket/{ticket_id}
 * @summary  modifie un  ticket selon son id
 * @type {Ticket}
 * @tags tickets
 * @security TokenAuth
 * @param {number} ticket_id.path.required
 * @return {object} 200 - ticket response
 * @return {object} 500 - Unexpected error
 */

ticketRouter.patch('/ticket/:ticket_id',  security.checkToken, security.authMiddleware(['developer','admin']), validation.check(ticketSchema.update(), "body"),ticketController.updateTicket);


/**
 * delete /api/ticket/{ticket_id}
 * @summary  supprime un  ticket selon son id
 * @type {Ticket}
 * @tags tickets
 * @security TokenAuth
 * @param {number} ticket_id.path.required
 * @return {object} 200 - ticket response
 * @return {object} 500 - Unexpected error
 */

ticketRouter.delete('/ticket/:ticket_id',  security.checkToken, security.authMiddleware(['developer','admin']), ticketController.deleteTicket);


export default ticketRouter; 