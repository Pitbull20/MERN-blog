import { body } from 'express-validator';

export const loginValidation = [
	body('email', 'Некоректний email').isEmail(),
	body('password', 'Пароль занадто короткий').isLength({ min: 5 }),
];

export const registerValidation = [
	body('email', 'Некоректний email').isEmail(),
	body('password', 'Пароль занадто короткий').isLength({ min: 5 }),
	body('fullName', 'Невірне ім’я').isLength({ min: 5 }),
	body('avatarUrl', 'Не коректне посилання').optional().isURL(),
];
