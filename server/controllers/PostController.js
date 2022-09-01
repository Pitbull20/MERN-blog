import PostModel from '../models/Post.js';

export const getAll = async (req, res) => {
	try {
		const posts = await PostModel.find().populate('user').exec();

		res.json(posts);
	} catch (err) {
		console.log(err);
		res.status(404).json({
			message: 'Статтей не знайдено',
		});
	}
};

export const getOne = async (req, res) => {
	try {
		const postId = req.params.id;

		const post = PostModel.findOneAndUpdate(
			{
				_id: postId,
			},
			{
				$inc: { viewsCount: 1 },
			},
			{
				returnDocument: 'after',
			},
			(err, doc) => {
				if (err) {
					console.log(err);
					return res.status(404).json({
						message: 'Статтю не знайдено',
					});
				}
				if (!doc) {
					return res.status(404).json({
						message: 'Не вдалося отримати статтю',
					});
				}
				return res.json(doc);
			}
		);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Статтей не знайдено',
		});
	}
};

export const create = async (req, res) => {
	try {
		const doc = new PostModel({
			title: req.body.title,
			text: req.body.text,
			imageUrl: req.body.imageUrl,
			tags: req.body.tags,
			user: req.userId,
		});

		const post = await doc.save();

		res.json(post);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не вдалося створити статтю',
		});
	}
};

export const remove = async (req, res) => {
	try {
		const postId = req.params.id;

		PostModel.findOneAndDelete(
			{
				_id: postId,
			},
			(err, doc) => {
				if (err) {
					console.log(err);
					return res.status(404).json({
						message: 'Не вдалося видалити статтю',
					});
				}
				if (!doc) {
					return res.status(404).json({
						message: 'Не вдалося отримати статтю',
					});
				}
				return res.json({
					success: true,
					message: 'Cтаттю було видалено',
				});
			}
		);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Помилка',
		});
	}
};

export const update = async (req, res) => {
	try {
		const postId = req.params.id;

		await PostModel.findOneAndUpdate(
			{
				_id: postId,
			},
			{
				title: req.body.title,
				text: req.body.text,
				tags: req.body.tags,
				imageUrl: req.body.imageUrl,
				user: req.body.userId,
			}
		);
		res.json({
			success: true,
			messages: 'Cтаття успішно оновлена',
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Щось пішло не так :(',
		});
	}
};

export const getLastTags = async (req, res) => {
	try {
		const posts = await PostModel.find().limit(5).exec();

		const tags = posts
			.map(obj => obj.tags)
			.flat()
			.slice(0, 5);

		res.json(tags);
	} catch (err) {
		console.log(err);
		res.status(404).json({
			message: 'Не вдалося отримати теги',
		});
	}
};
