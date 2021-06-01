import path from 'path';
import { injectable, inject } from 'tsyringe';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
	email: string;
}

@injectable()
class SendForgotPasswordEmailService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,

		@inject('MailProvider')
		private mailProvider: IMailProvider,

		@inject('UserTokensRepository')
		private userTokenRepository: IUserTokensRepository,
	) {}

	public async execute({ email }: IRequest): Promise<void> {
		const user = await this.usersRepository.findByEmail(email);

		if (!user)
			throw new AppError('Cannot recover password from non existing user');

		const { token } = await this.userTokenRepository.generate(user.id);

		const forgotPasswordTemplate = path.resolve(
			__dirname,
			'..',
			'templates',
			'forgot_password.hbs',
		);

		await this.mailProvider.sendMail({
			subject: '[GoBarber] Recuperação de senha',
			to: {
				name: user.name,
				email: user.email,
			},
			templateData: {
				file: forgotPasswordTemplate,
				variables: {
					name: user.name,
					link: `http://localhost:3000/reset_password?token=${token}`,
				},
			},
		});
	}
}
export default SendForgotPasswordEmailService;
