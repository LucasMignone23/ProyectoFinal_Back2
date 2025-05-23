import { Router } from 'express';
import passport from '../config/passport.js';
import { register, login, current } from '../controllers/session.controller.js';
const router = Router();router.post('/register',register);router.post('/login',passport.authenticate('login',{session:false}),login);
router.get('/current',passport.authenticate('current',{session:false}),current);export default router;
