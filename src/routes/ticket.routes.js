import { Router } from 'express';
import passport from '../config/passport.js';
import { getTicket } from '../controllers/ticket.controller.js';
const router = Router();router.get('/:tid',passport.authenticate('current',{session:false}),getTicket);export default router;
