import { Request, Response, NextFunction } from 'express';
import product from '../models/product';
import ConflictError from '../errors/conflict-error';

const validateProduct = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const { title } = req.body;
    const existingProduct = await product.findOne({ title });
    if (existingProduct) {
      throw new ConflictError('Товар с таким названием уже существует');
    }
    return next();
  } catch (err) {
    return next(err);
  }
};

export default validateProduct;
