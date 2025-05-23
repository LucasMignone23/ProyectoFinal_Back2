import TicketModel from '../models/ticket.model.js';
export default class TicketRepository {
  async create(data) { return TicketModel.create(data); }
  async getById(id) { return TicketModel.findById(id); }
}
