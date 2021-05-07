import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('AuthenticateUser', () => {
	it('should be able to authenticate user', async () => {
		const fakeUserRepository = new FakeUserRepository();
		const fakeHashProvider = new FakeHashProvider();

		const createUserService = new CreateUserService(
			fakeUserRepository,
			fakeHashProvider,
		);
		const authenticateUserService = new AuthenticateUserService(
			fakeUserRepository,
			fakeHashProvider,
		);

		const user = await createUserService.execute({
			name: 'John Doe',
			email: 'johndoe@test.com',
			password: 'johndoe',
		});

		const response = await authenticateUserService.execute({
			email: 'johndoe@test.com',
			password: 'johndoe',
		});

		expect(response).toHaveProperty('authenticationToken');
		expect(response.user).toEqual(user);
	});
	it('should not be able to authenticate if user is not registered', async () => {
		const fakeUserRepository = new FakeUserRepository();
		const fakeHashProvider = new FakeHashProvider();
		const authenticateUserService = new AuthenticateUserService(
			fakeUserRepository,
			fakeHashProvider,
		);

		expect(
			authenticateUserService.execute({
				email: 'johndoe@teste.com',
				password: 'teste',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
	it('should not be able to authenticate if password is incorrect', async () => {
		const fakeUserRepository = new FakeUserRepository();
		const fakeHashProvider = new FakeHashProvider();

		const createUserService = new CreateUserService(
			fakeUserRepository,
			fakeHashProvider,
		);
		const authenticateUserService = new AuthenticateUserService(
			fakeUserRepository,
			fakeHashProvider,
		);

		await createUserService.execute({
			name: 'John Doe',
			email: 'johndoe@test.com',
			password: 'johndoe',
		});

		expect(
			authenticateUserService.execute({
				email: 'johndoe@test.com',
				password: 'doe',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
