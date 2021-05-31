import { Response, Request } from 'express';
import { container } from 'tsyringe';

import SendForgotEmailPasswordService from '@modules/users/services/SendForgotPasswordEmailService';

export default class ForgotPasswordController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { email } = request.body;
		const sendFongotPasswordEmail = container.resolve(
			SendForgotEmailPasswordService,
		);

		await sendFongotPasswordEmail.execute({ email });

		return response.status(204).json();
	}
}
