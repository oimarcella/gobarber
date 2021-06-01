import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUser', () => {
	beforeEach(() => {
		fakeUserRepository = new FakeUserRepository();
		fakeHashProvider = new FakeHashProvider();
		createUserService = new CreateUserService(
			fakeUserRepository,
			fakeHashProvider,
		);
	});

	it('should be able to create a new user', async () => {
		const userCreated = await createUserService.execute({
			name: 'John Doe',
			email: 'johndoe@teste.com',
			password: 'teste',
		});

		expect(userCreated.name).toBe('John Doe');
	});
	it('should not be able to create two users with same email', async () => {
		await createUserService.execute({
			name: 'John Doe',
			email: 'johndoe@teste.com',
			password: 'teste',
		});

		await expect(
			createUserService.execute({
				name: 'John Doe',
				email: 'johndoe@teste.com',
				password: 'teste',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
