import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
	name: string;
	email: string;
	password: string;
}

@injectable()
class CreateUserService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,

		@inject('HashProvider')
		private hashProvider: IHashProvider,
	) { }

	public async execute({ name, email, password }: IRequest): Promise<User> {
		const checkExistingEmail = await this.usersRepository.findByEmail(email);

		if (checkExistingEmail) {
			throw new AppError('This e-mail already exists', 400);
		}

		const hashedPassword = await this.hashProvider.generateHash(password);
		const user = await this.usersRepository.create({
			name,
			email,
			password: hashedPassword,
		});

		// const copyOfCreatedUser = { ...user };
		// delete copyOfCreatedUser.password;
		// return copyOfCreatedUser;
		return user;
	}
}
export default CreateUserService;
