import jwt from 'jsonwebtoken';
import bc from 'bcrypt';
import UserModel from '../models/User.js';

export const register = async (req, res) => {
	try {
		const password = req.body.password;
		const salt = await bc.genSalt(10);
		const hash = await bc.hash(password, salt);
		const doc = new UserModel({
			email: req.body.email,
			passwordHash: hash,
			fullName: req.body.fullName,
			avaratUrl: req.body.avaratUrl,
		});

		const user = await doc.save();

		const token = jwt.sign(
			{
				_id: user._id,
			},
			'secret',
			{
				expiresIn: '30d',
			}
		);

		const { passwordHash, ...userData } = user._doc;

		res.json({
			...userData,
			token,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Не вдалося зареєструватися' });
	}
};

export const login = async (req, res) => {
	try {
		const user = await UserModel.findOne({ email: req.body.email });

		if (!user) {
			return res
				.status(404)
				.json({ message: 'Користувача не було знайдено' });
		}

		const isValidPass = await bc.compare(
			req.body.password,
			user._doc.passwordHash
		);

		if (!isValidPass) {
			return res
				.status(403)
				.json({ message: 'Невірний логін або пароль' });
		}
		const token = jwt.sign(
			{
				_id: user._id,
			},
			'secret',
			{
				expiresIn: '30d',
			}
		);

		const { passwordHash, ...userData } = user._doc;

		res.json({
			...userData,
			token,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не вдалося авторизуватися',
		});
	}
};

export const getMe = async (req, res) => {
	try {
		const user = await UserModel.findById(req.userId);

		if (!user) {
			res.status(404).json({
				message: 'Користувача не знайдено',
			});
		}
		const { passwordHash, ...userData } = user._doc;

		res.json({
			...userData,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Не вдалося отримати данні' });
	}
};
