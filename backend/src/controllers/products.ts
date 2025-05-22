import { NextFunction, Request, Response } from 'express';
import product from '../models/product';

export const getProducts = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const products = await product.find({});
    return res.status(200).send({ items: products, total: products.length });
  } catch (err) {
    return next(err);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      description, image, title, category, price,
    } = req.body;
    await product.create({
      title, description, image, category, price,
    });
    return res.status(201).json({ message: 'Продукт создан' });
  } catch (err) {
    return next(err);
  }
};
