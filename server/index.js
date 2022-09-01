import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';
import { registerValidation, loginValidation } from './validations/auth.js';
import { postCreateValidation } from './validations/post.js';
import { UserController, PostController } from './controllers/index.js';
import { checkAuth, handlerValidationErrors } from './utils/index.js';

mongoose
	.connect(
		'mongodb+srv://admin:1@cluster0.7alvjy6.mongodb.net/?retryWrites=true&w=majority'
	)
	.then(() => console.log('Connect --------------------> OK'))
	.catch(err => console.log(err));

const app = express();

const storage = multer.diskStorage({
	destination: (_, __, cd) => {
		cd(null, 'uploads');
	},
	filename: (_, file, cd) => {
		cd(null, file.originalname);
	},
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 3001;

app.post(
	'/auth/register',
	handlerValidationErrors,
	registerValidation,
	UserController.register
);
app.post(
	'/auth/login',
	handlerValidationErrors,
	loginValidation,
	UserController.login
);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload', upload.single('image'), (req, res) => {
	res.json({
		url: `/uploads/${req.file.originalname}`,
	});
});

app.get('/tags', PostController.getLastTags);
app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.delete('/posts', checkAuth, postCreateValidation, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, PostController.update);

app.listen(PORT, err => {
	if (err) console.log(err);
	console.log(`Server work on http://localhost:${PORT}/`);
});
