import CartModel from '../models/cart.model.js';
export default class CartRepository {
  async create(data) { return CartModel.create(data); }
  async getById(id) { return CartModel.findById(id).populate('products.product'); }
  async update(id,data) { return CartModel.findByIdAndUpdate(id,data,{new:true}); }
  async delete(id) { return CartModel.findByIdAndDelete(id); }
}
