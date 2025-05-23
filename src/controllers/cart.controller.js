import CartRepository from '../dao/repositories/cart.repository.js';
import ProductRepository from '../dao/repositories/product.repository.js';
import TicketRepository from '../dao/repositories/ticket.repository.js';
import { generateCode } from '../utils/generateCode.js';
import { sendPurchaseMail } from '../services/email.service.js';

const cartRepo    = new CartRepository();
const prodRepo    = new ProductRepository();
const ticketRepo  = new TicketRepository();

export const createCart = async (req, res, next) => {
  try {
    const c = await cartRepo.create({ products: [] });
    res.status(201).json({ id: c._id });
  } catch (e) {
    next(e);
  }
};

export const getCartById = async (req, res, next) => {
  try {
    const c = await cartRepo.getById(req.params.cid);
    if (!c) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.json(c);
  } catch (e) {
    next(e);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    let cart = await cartRepo.getById(cid);
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const prod = await prodRepo.getById(pid);
    if (!prod) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const exist = cart.products.find(p => p.product._id.toString() === pid);
    if (exist) {
      exist.quantity++;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    cart = await cartRepo.update(cid, { products: cart.products });
    res.json(cart);
  } catch (e) {
    next(e);
  }
};

export const purchase = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cart = await cartRepo.getById(cid);
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    let total = 0;
    const purchased    = [];
    const notPurchased = [];

    for (const item of cart.products) {
      const prod = await prodRepo.getById(item.product._id);
      if (prod.stock >= item.quantity) {
        prod.stock -= item.quantity;
        await prod.save();
        total += item.quantity * prod.price;
        purchased.push(item);
      } else {
        notPurchased.push(item.product._id);
      }
    }

    const ticket = await ticketRepo.create({
      code: generateCode(),
      purchase_datetime: new Date(),
      amount: total,
      purchaser: req.user.email
    });

    // Update cart to keep only not purchased items
    await cartRepo.update(cid, {
      products: cart.products.filter(i => notPurchased.includes(i.product._id))
    });

    // Send confirmation email
    await sendPurchaseMail(req.user.email, ticket);

    res.json({ ticket, notPurchased });
  } catch (e) {
    next(e);
  }
};
