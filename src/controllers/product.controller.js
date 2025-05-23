import ProductRepository from '../dao/repositories/product.repository.js';

export const getAll = async (req, res, next) => {
  try {
    const products = await new ProductRepository().getAll();
    res.json(products);
  } catch (e) {
    next(e);
  }
};

export const getById = async (req, res, next) => {
  try {
    const product = await new ProductRepository().getById(req.params.pid);
    if (!product) {
      return res.status(404).json({ error: 'not found' });
    }
    res.json(product);
  } catch (e) {
    next(e);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const newProduct = await new ProductRepository().create(req.body);
    res.status(201).json(newProduct);
  } catch (e) {
    next(e);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const updated = await new ProductRepository().update(req.params.pid, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'not found' });
    }
    res.json(updated);
  } catch (e) {
    next(e);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    await new ProductRepository().delete(req.params.pid);
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};
