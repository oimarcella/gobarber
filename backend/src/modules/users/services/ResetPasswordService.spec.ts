import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import ResetPasswordService from './ResetPasswordService';

let fakeUserRepository: FakeUserRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPassword: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('ResetPasswordService', () => {
	beforeEach(() => {
		fakeUserRepository = new FakeUserRepository();
		fakeUserTokensRepository = new FakeUserTokensRepository();
		fakeHashProvider = new FakeHashProvider();
		resetPassword = new ResetPasswordService(
			fakeUserRepository,
			fakeUserTokensRepository,
			fakeHashProvider,
		);
	});

	it('should be able to reset password informing recovery token password', async () => {
		const user = await fakeUserRepository.create({
			name: 'John Doe',
			email: 'johndoe@test.com',
			password: '123456',
		});

		const userToken = await fakeUserTokensRepository.generate(user.id);

		const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

		await resetPassword.execute({
			password: 'novasenhaxxx',
			token: userToken.token,
		});

		const updateUser = await fakeUserRepository.findById(user.id);

		expect(generateHash).toHaveBeenCalledWith('novasenhaxxx');
		expect(updateUser?.password).toBe('novasenhaxxx');
	});
	it('should not be able to recover password with not valid token', async () => {
		await expect(
			resetPassword.execute({
				password: 'novasenhaxxx',
				token: 'not-valid-token',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});

// verificar
// se está sendo feito hash da senha
// se está dentro do intervalo de 2h pra fazer o reset da senha
