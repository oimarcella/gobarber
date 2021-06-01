import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let authenticateUserService: AuthenticateUserService;

describe('AuthenticateUser', () => {
	beforeEach(() => {
		fakeUserRepository = new FakeUserRepository();
		fakeHashProvider = new FakeHashProvider();
		createUserService = new CreateUserService(
			fakeUserRepository,
			fakeHashProvider,
		);
		authenticateUserService = new AuthenticateUserService(
			fakeUserRepository,
			fakeHashProvider,
		);
	});

	it('should be able to authenticate user', async () => {
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
		await expect(
			authenticateUserService.execute({
				email: 'johndoe@teste.com',
				password: 'teste',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
	it('should not be able to authenticate if password is incorrect', async () => {
		await createUserService.execute({
			name: 'John Doe',
			email: 'johndoe@test.com',
			password: 'johndoe',
		});

		await expect(
			authenticateUserService.execute({
				email: 'johndoe@test.com',
				password: 'doe',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
