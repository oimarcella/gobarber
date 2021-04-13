import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';

import authConfig from '@config/auth';
import IUsersRepository from '../repositories/IUsersRepository';

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
	) { }

	public async execute({ email, password }: IRequest): Promise<IResponse> {
		const user = await this.usersRepository.findByEmail(email);

		if (!user) throw new AppError('Incorrect email/password', 401);

		const passwordIsCorrect = await compare(password, user.password);
		if (!passwordIsCorrect) throw new AppError('Incorrect email/password', 401);

		// delete user.password;

		const authenticationToken = sign({}, authConfig.jwt.secret, {
			subject: user.id,
			expiresIn: authConfig.jwt.expiresIn,
		});

		return { authenticationToken, user };
	}
}
export default AuthenticateUserService;
