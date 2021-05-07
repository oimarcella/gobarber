import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import authConfig from '@config/auth';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
	email: string;
	password: string;
}
interface IResponse {
	authenticationToken: string;
	user: User;
}

@injectable()
class AuthenticateUserService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,

		@inject('HashProvider')
		private hashProvider: IHashProvider,
	) {}

	public async execute({ email, password }: IRequest): Promise<IResponse> {
		const user = await this.usersRepository.findByEmail(email);

		if (!user) throw new AppError('Incorrect email/password', 401);

		const passwordIsCorrect = await this.hashProvider.compareHash(
			password,
			user.password,
		);
		if (!passwordIsCorrect) {
			throw new AppError('Incorrect email/password', 401);
		}

		const authenticationToken = sign({}, authConfig.jwt.secret, {
			subject: user.id,
			expiresIn: authConfig.jwt.expiresIn,
		});

		return { authenticationToken, user };
	}
}
export default AuthenticateUserService;
