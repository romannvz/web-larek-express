import { Router } from 'express';
import { getProducts, createProduct } from '../controllers/products';
import productJoiSchema from '../schemas/product';
import validateSchema from '../middlewares/validate-schema';
import validateProduct from '../middlewares/validate-product';

const router = Router();

router.get('/', getProducts);

router.post(
  '/',
  validateSchema(productJoiSchema),
  validateProduct,
  createProduct,
);

export default router;
