import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';

import authConfig from '@config/auth';

interface Request {
	email: string;
	password: string;
}
interface Response {
	authenticationToken: string;
	user: User;
}

class AuthenticateUserService {
	public async execute({ email, password }: Request): Promise<Response> {
		const usersRepository = getRepository(User);

		const user = await usersRepository.findOne({
			where: { email },
		});

		if (!user) throw new AppError('Incorrect email/password', 401);

		const passwordIsCorrect = await compare(password, user.password);
		if (!passwordIsCorrect) throw new AppError('Incorrect email/password', 401);

		delete user.password;

		const authenticationToken = sign({}, authConfig.jwt.secret, {
			subject: user.id,
			expiresIn: authConfig.jwt.expiresIn,
		});

		return { authenticationToken, user };
	}
}
export default AuthenticateUserService;
