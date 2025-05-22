import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import BadRequestError from '../errors/bad-request-error';

const validateSchema = (schema: ObjectSchema) => (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const { error } = schema.validate(req.body, {
    abortEarly: true,
    stripUnknown: true,
  });
  if (error) {
    return next(new BadRequestError(error.message));
  }
  return next();
};

export default validateSchema;
