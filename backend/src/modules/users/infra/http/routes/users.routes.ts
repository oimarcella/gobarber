import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const usersRouter = Router();

const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
	const { name, email, password } = request.body;

	const createUserService = new CreateUserService();
	const user = await createUserService.execute({ name, email, password });
	response.status(200).json(user);
});

usersRouter.use(ensureAuthenticated);

usersRouter.patch(
	'/avatar',
	upload.single('avatar'),
	async (request, response) => {
		const updateUserAvatar = new UpdateUserAvatarService();
		const userUpdated = await updateUserAvatar.execute({
			avatarFilename: request.file.filename,
			user_id: request.user.id,
		});

		response.status(200).json({ userUpdated });
	},
);

export default usersRouter;
