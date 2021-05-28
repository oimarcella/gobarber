import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import ResetPasswordService from './ResetPasswordService';

let fakeUserRepository: FakeUserRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPassword: ResetPasswordService;

describe('ResetPassword', () => {
	beforeEach(() => {
		fakeUserRepository = new FakeUserRepository();
		fakeUserTokensRepository = new FakeUserTokensRepository();

		resetPassword = new ResetPasswordService(
			fakeUserRepository,
			fakeUserTokensRepository,
		);
	});

	it('should be able to reset password informing recovery token password', async () => {
		const user = await fakeUserRepository.create({
			name: 'John Doe',
			email: 'johndoe@test.com',
			password: '123456',
		});

		const userToken = await fakeUserTokensRepository.generate(user.id);

		await resetPassword.execute({
			password: 'novasenhaxxx',
			token: userToken.id,
		});

		const updateUser = await fakeUserRepository.findById(user.id);
		expect(updateUser?.password).toBe('novasenhaxxx');
	});
});
