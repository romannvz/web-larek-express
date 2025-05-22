import Joi from 'joi';

export default Joi.object({
  payment: Joi.string().valid('card', 'online').required().messages({
    'any.only': 'Некорректный способ оплаты',
    'any.required': 'Способ оплаты обязателен',
  }),
  email: Joi.string().email({ allowUnicode: false }).required().messages({
    'string.email': 'Невалидный email',
    'string.empty': 'Email обязателен',
  }),
  phone: Joi.string()
    .custom((value, helpers) => {
      const cleaned = value.replace(/[^\d]/g, '');
      if (!cleaned.startsWith('7')) {
        return helpers.error('any.invalid');
      }
      const normalized = `+${cleaned}`;
      if (!/^\+7[0-9]{10}$/.test(normalized)) {
        return helpers.error('string.pattern.base');
      }
      return normalized;
    })
    .pattern(/^\+7[7-9][0-9]{9}$/)
    .required()
    .messages({
      'string.pattern.base': 'Невалидный номер телефона',
      'string.empty': 'Номер телефона обязателен',
    }),
  address: Joi.string().trim().required().messages({
    'string.empty': 'Адрес обязателен',
  }),
  total: Joi.number().invalid(NaN).min(0).required()
    .messages({
      'number.base': 'Сумма заказа должна быть числом',
      'number.min': 'Сумма не может быть отрицательной',
      'any.invalid': 'Сумма заказа должна быть числом',
    }),
  items: Joi.array()
    .items(Joi.string().trim().min(1).required())
    .min(1)
    .required()
    .messages({
      'array.min': 'Список товаров не может быть пустым',
      'string.empty': 'ID товара не может быть пустым',
    }),
});
