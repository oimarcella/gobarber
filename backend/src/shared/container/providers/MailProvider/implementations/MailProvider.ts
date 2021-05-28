import IMailProvider from '../models/IMailProvider';

export default class MailProvider implements IMailProvider {
	public async sendMail() {
		console.log('hello');
	}
}
