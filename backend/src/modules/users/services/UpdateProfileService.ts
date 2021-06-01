import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
	user_id: string;
	name: string;
	email: string;
	old_password?: string;
	password?: string;
}
@injectable()
class UpdateProfileService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,

		@inject('HashProvider')
		private hashProvider: IHashProvider,
	) { }

	public async execute({
		user_id,
		name,
		email,
		old_password,
		password,
	}: IRequest): Promise<void> {
		const user = await this.usersRepository.findById(user_id);

		if (!user) {
			throw new AppError('User not found');
		}

		if (password) {
			if (!old_password) {
				throw new AppError('Need to confirm old password');
			}

			const oldPasswordIsCorrected = await this.hashProvider.compareHash(
				old_password,
				user.password,
			);
			if (!oldPasswordIsCorrected) {
				throw new AppError('Old password is not correct');
			}
			user.password = password;
		}

		user.email = email || user.email;
		user.name = name || user.name;

		await this.usersRepository.save(user);
	}
}
export default UpdateProfileService;
