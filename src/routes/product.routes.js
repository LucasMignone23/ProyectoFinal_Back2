import { Router } from 'express';
import passport from '../config/passport.js';
import { authorizeRole } from '../middlewares/role.middleware.js';
import { getAll, getById, createProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js';
const router = Router();router.get('/',getAll);router.get('/:pid',getById);
router.post('/',passport.authenticate('current',{session:false}),authorizeRole('admin'),createProduct);
router.put('/:pid',passport.authenticate('current',{session:false}),authorizeRole('admin'),updateProduct);
router.delete('/:pid',passport.authenticate('current',{session:false}),authorizeRole('admin'),deleteProduct);
export default router;
