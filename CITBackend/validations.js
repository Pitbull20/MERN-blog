import { body } from "express-validator";

export const loginValidation = [
    body("email", "Невірний формат email").isEmail(),
    body("password", "Пароль має містити мінімум 5 символів").isLength({
        min: 5,
    }),
];

export const registerValidation = [
    body("email", "Невірний формат email").isEmail(),
    body("password", "Пароль має містити мінімум 5 символів").isLength({
        min: 5,
    }),
    body("fullName", "Вкажіть ім'я").isLength({ min: 3 }),
    body("avatarUrl", "Невірна силка на аватарку").optional().isURL(),
];

export const postCreateValidation = [
    body("title", "Введіть заголовок статті").isLength({ min: 3 }).isString(),
    body("text", "Введіть заголовок статті").isLength({ min: 3 }).isString(),
    body("tags", "Невірний формат тегів").optional().isString(),
    body("imageUrl", "Невірна силка на картинку").optional().isString(),
];
