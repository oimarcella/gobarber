import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {
	public async update(request: Request, response: Response): Promise<Response> {
		const updateUserAvatar = container.resolve(UpdateUserAvatarService);

		console.log('avatarcontroller');
		const userUpdated = await updateUserAvatar.execute({
			avatarFilename: request.file.filename,
			user_id: request.user.id,
		});

		return response.status(200).json({ userUpdated });
	}
}
