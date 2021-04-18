import path from 'path';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';

import uploadConfig from '@config/upload';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
	user_id: string;
	avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
	) { }

	public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
		const user = await this.usersRepository.findByEmail(user_id);

		if (!user) {
			throw new AppError('Only users authenticated can change avatar', 401);
		}

		if (user.avatar) {
			// verificando existencia do arquivo e deletando
			const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
			const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

			if (userAvatarFileExists) {
				await fs.promises.unlink(userAvatarFilePath);
			}
		}

		user.avatar = avatarFilename;
		console.log(user);

		await this.usersRepository.save(user);

		// delete user.password;

		return user;
	}
}
export default UpdateUserAvatarService;
