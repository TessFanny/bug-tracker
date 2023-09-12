import Ticket from "../models/ticketModel.js";

const ticketController = {
  getAllTickets: async (req, res, next) => {
    try {
      const tickets = await Ticket.findAll();
      if (!tickets) {
        res.status(404).json("no resources found");
      } else {
        res.status(200).json(tickets);
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  getAllTicketsByProject: async (req, res, next) => {
    try {
      const ticketModel = new Ticket(req.body);
      const tickets = await ticketModel.getAllTicketsByProjectModel(
        req.params.project_id
      );
      if (!tickets) {
        res.status(404).json("no resources found");
      } else {
        res.status(200).json(tickets);
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  getTicketsUserIsAssignedTo : async (req, res, next)=>{
    try {
      const ticketModel = new Ticket(req.body);
      const tickets = await ticketModel.getTicketsUserIsAssignedToModel(req.params.user_id);
      console.log(tickets);
      if (!tickets) {
        res.status(404).json("no resources found");
      } else {
        res.status(200).json(tickets);
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  getOneTicket: async (req, res, next) => {
    try {
      const ticketModel = new Ticket(req.body);
      const ticket = await ticketModel.findByPk(req.params.ticket_id);
      if (!ticket) {
        res.status(404).json("no ticket found");
      } else {
        res.status(200).json(ticket);
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  createTicket: async (req, res, next) => {
    try {
      const ticketModel = new Ticket(req.body);
      const ticket = await ticketModel.create(req.body);
      if (ticket) {
        res.status(200).json(ticket);
      } else {
        res.status(400).json("failed to create a ticket");
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  getAllUsersOnTicket: async (req, res, next) => {
    try {
      const ticketModel = new Ticket(req.body);
      const members = await ticketModel.getUsersOnTicketModel(
        +req.params.ticket_id
      );
      if (!members) {
        res.status(404).json("no user found in this Ticket");
      } else {
        res.status(200).json(members);
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
 
  assignUserToTicket: async (req, res, next) => {
    try {
      const { user_id } = req.body;
      const { ticket_id } = req.params;
      const ticketModel = new Ticket(req.body);

      const verifyTicket = await ticketModel.getUserTicketModel(
        ticket_id,
        user_id
      );

      if (verifyTicket) {
        res.status(409).json(`user  already assigned to the Ticket `);
      } else {
        const ticketAdded = await ticketModel.assignUsertoTicketModel(
          user_id,
          ticket_id
        );
        if (ticketAdded) {
          res.status(201).json({
            msg: `User  assigned to the project  succesfully`,
          });
        } else {
          res.status(400).json("failed to add a new member");
        }
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  updateTicket: async (req, res, next) => {
    try {
      const ticketModel = new Ticket(req.body);
      const ticket = ticketModel.findByPk(req.params.ticket_id);
      if (ticket) {
        const updatedTicket = await ticketModel.update(
          req.params.ticket_id,
          req.body
        );
        console.log(updatedTicket);
        res.status(200).json(updatedTicket);
      } else {
        res
          .status(400)
          .json(`the ticket you are trying to update doesn't exists`);
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  deleteTicket: async (req, res, next) => {
    try {
      const ticketModel = new Ticket(req.body);
      const ticket = await ticketModel.findByPk(req.params.ticket_id);
      console.log(ticket);
      if (ticket) {
        const deletedTicket = await ticketModel.deleteTicketModel(req.params.ticket_id);
        console.log('ticket succsessfully deleted');
        res.status(200).json(deletedTicket);
      } else {
        res
          .status(400)
          .json(`the Ticket you are trying to delete doesn't exists`);
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};

export default ticketController;
