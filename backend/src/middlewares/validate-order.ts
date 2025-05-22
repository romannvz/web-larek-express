import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import product from '../models/product';
import BadRequestError from '../errors/bad-request-error';

const validateOrder = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const { items, total } = req.body;

    const invalidId = items.find((id: string) => !mongoose.isValidObjectId(id));

    if (invalidId) {
      throw new BadRequestError(
        'Один или несколько товаров имеют невалидный ID',
      );
    }

    const products = await product.find({ _id: { $in: items } });

    if (invalidId || !products || products.length !== items.length) {
      throw new BadRequestError('Один или несколько товаров не найдены в базе');
    }

    const unavailable = products.find((p) => p.price === null);
    if (unavailable) {
      throw new BadRequestError('Один из товаров недоступен для продажи');
    }

    const calculatedTotal = products.reduce(
      (sum, p) => sum + (p.price ?? 0),
      0,
    );
    if (calculatedTotal !== total) {
      throw new BadRequestError('Некорректная сумма заказа');
    }

    return next();
  } catch (err) {
    return next(err);
  }
};

export default validateOrder;
