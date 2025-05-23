import ProductModel from '../models/product.model.js';
export default class ProductRepository {
  async getAll() { return ProductModel.find(); }
  async getById(id) { return ProductModel.findById(id); }
  async create(data) { return ProductModel.create(data); }
  async update(id,data) { return ProductModel.findByIdAndUpdate(id,data,{new:true}); }
  async delete(id) { return ProductModel.findByIdAndDelete(id); }
}
