import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
	password: string;
	token: string;
}

@injectable()
class ResetPasswordService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,

		@inject('UserTokensRepository')
		private userTokenRepository: IUserTokensRepository,
	) {}

	public async execute({ token, password }: IRequest): Promise<void> {
		const userToken = await this.userTokenRepository.findByToken(token);

		if (!userToken) {
			throw new AppError('Invalid recovery password token');
		}

		const user = this.usersRepository.findById(userToken.user_id);

		if (!user) {
			throw new AppError('User does not exists');
		}

		user.password = password;
		await this.usersRepository.save(user);
	}
}
export default ResetPasswordService;
