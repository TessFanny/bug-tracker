import Ticket from "../models/ticketModel.js";

const ticketController = {
  getAllTickets: async(req, res, next)=>{
    try {        
        const tickets = await Ticket.findAll();
        if(!tickets){
            res.status(404).json('no resources found')
        }else{
            res.status(200).json(tickets)
        }
    } catch (error) {
        console.error(error)
        next(error)
    }
  }, 
  getOneTicket : async (req, res, next)=>{
    try {
        const ticketModel = new Ticket(req.body)
        const ticket = await ticketModel.findByPk(req.params.ticket_id)
        if(!ticket){
            res.status(404).json('no ticket found')
        }else{
            res.status(200).json(ticket)
        }
    } catch (error) {
        console.error(error)
        next(error)
    }
  },
  createTicket: async(req, res, next)=>{
     try {
        const ticketModel = new Ticket(req.body)
        const ticket = await ticketModel.create(req.body)
        if(ticket){
            res.status(200).json(ticket)
        }else{
            res.status(400).json('failed to create a ticket')
        }
     } catch (error) {
        console.error(error)
        next(error)
     }
  },

  updateTicket: async(req,res, next)=>{
    try {
        const ticketModel = new Ticket(req.body)
        const ticket = ticketModel.findByPk(req.params.ticket_id)
    if(ticket){
        const updatedTicket = await ticketModel.update(req.params.ticket_id, req.body)
        console.log(updatedTicket);
        res.status(200).json(updatedTicket)
      }else{
       res.status(400).json(`the ticket you are trying to update doesn't exists`)
      }
    } catch (error) {
        console.error(error)
        next(error)
    }
    
  },
  deleteTicket: async(req,res, next)=>{
    try {
        const ticketModel = new Ticket(req.body)
        const ticket = ticketModel.findByPk(req.params.ticket_id)
    if(ticket){
        const deletedTicket = await ticketModel.delete(req.params.ticket_id)
        console.log(deletedTicket);
        res.status(200).json(deletedTicket)
      }else{
       res.status(400).json(`the user you are trying to delete doesn't exists`)
      }
    } catch (error) {
        console.error(error)
        next(error)
    }
    
  },

}

export default ticketController;