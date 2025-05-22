import { Router } from 'express';
import createOrder from '../controllers/orders';
import orderJoiSchema from '../schemas/order';
import validateSchema from '../middlewares/validate-schema';
import validateOrder from '../middlewares/validate-order';

const router = Router();

router.post('/', validateSchema(orderJoiSchema), validateOrder, createOrder);

export default router;
