import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  statusCode?: number;
}

const errorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  res
    .status(err.statusCode || 500)
    .send({ message: err.message || 'Произошла ошибка на сервере' });
};

export default errorHandler;
