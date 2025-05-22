import { Request, Response, NextFunction } from 'express';
import { faker } from '@faker-js/faker';

const createOrder = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { total } = req.body;
    const id = faker.string.uuid();
    return res.status(201).send({ id, total });
  } catch (err) {
    return next(err);
  }
};

export default createOrder;
