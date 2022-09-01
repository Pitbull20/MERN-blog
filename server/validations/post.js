import { body } from 'express-validator';

export const postCreateValidation = [
	body('title', 'Введіть заголовок для статті')
		.isLength({ min: 3 })
		.isString(),
	body('text', 'Введіть текст статті').isLength({ min: 10 }).isString(),
	body('tags', 'Невірний формат тега').optional().isString(),
	body('imageUrl', 'Некоректне посилання на статтю').optional().isString(),
];
