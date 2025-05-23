import { Router } from 'express';
import passport from '../config/passport.js';
import { authorizeRole } from '../middlewares/role.middleware.js';
import { createCart, getCartById, addToCart, purchase } from '../controllers/cart.controller.js';
const router = Router();
// Crear carrito vacío
router.post('/',passport.authenticate('current',{session:false}),authorizeRole('user'),createCart);
// Obtener carrito
router.get('/:cid',passport.authenticate('current',{session:false}),authorizeRole('user'),getCartById);
// Agregar producto al carrito
router.post('/:cid/product/:pid',passport.authenticate('current',{session:false}),authorizeRole('user'),addToCart);
// Finalizar compra
router.post('/:cid/purchase',passport.authenticate('current',{session:false}),authorizeRole('user'),purchase);
export default router;
