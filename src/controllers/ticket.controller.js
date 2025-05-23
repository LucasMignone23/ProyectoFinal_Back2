import TicketRepository from '../dao/repositories/ticket.repository.js';
export const getTicket=async(req,res,next)=>{try{const t=await new TicketRepository().getById(req.params.tid);
if(!t)return res.status(404).json({error:'Ticket not found'});res.json(t);}catch(e){next(e);} };
