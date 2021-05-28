import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
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

		@inject('HashProvider')
		private hashProvider: IHashProvider,
	) {}

	public async execute({ token, password }: IRequest): Promise<void> {
		const userToken = await this.userTokenRepository.findByToken(token);

		if (!userToken) {
			throw new AppError('Invalid recovery password token');
		}

		const user = await this.usersRepository.findById(userToken.user_id);

		if (!user) {
			throw new AppError('User does not exists');
		}

		user.password = await this.hashProvider.generateHash(password);
		await this.usersRepository.save(user);
	}
}
export default ResetPasswordService;
