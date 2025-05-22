import Joi from 'joi';

const imageJoiSchema = Joi.object({
  fileName: Joi.string().trim().required().messages({
    'string.empty': 'Путь до файла обязателен',
  }),
  originalName: Joi.string().trim().required().messages({
    'string.empty': 'Имя файла обязательно',
  }),
});

const productJoiSchema = Joi.object({
  title: Joi.string().trim().min(2).max(30)
    .required()
    .messages({
      'string.empty': 'Название обязательно',
      'string.min': 'Название должно быть минимум 2 символа',
      'string.max': 'Название должно быть максимум 30 символов',
    }),
  image: imageJoiSchema.required().messages({
    'any.required': 'Изображение обязательно',
  }),
  category: Joi.string().trim().required().messages({
    'string.empty': 'Категория обязательна',
  }),
  description: Joi.string().allow('').optional(),
  price: Joi.number().min(0).allow(null).optional()
    .messages({
      'number.base': 'Цена должна быть числом',
      'number.min': 'Цена не может быть отрицательной',
    }),
});

export default productJoiSchema;
