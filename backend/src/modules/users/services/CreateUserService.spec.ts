import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
	it('should be able to create a new user', async () => {
		const fakeUserRepository = new FakeUserRepository();
		const fakeHashProvider = new FakeHashProvider();
		const createUserService = new CreateUserService(
			fakeUserRepository,
			fakeHashProvider,
		);

		const userCreated = await createUserService.execute({
			name: 'John Doe',
			email: 'johndoe@teste.com',
			password: 'teste',
		});

		expect(userCreated.name).toBe('John Doe');
	});
	it('should not be able to create two users with same email', async () => {
		const fakeUserRepository = new FakeUserRepository();
		const fakeHashProvider = new FakeHashProvider();
		const createUserService = new CreateUserService(
			fakeUserRepository,
			fakeHashProvider,
		);

		await createUserService.execute({
			name: 'John Doe',
			email: 'johndoe@teste.com',
			password: 'teste',
		});

		expect(
			createUserService.execute({
				name: 'John Doe',
				email: 'johndoe@teste.com',
				password: 'teste',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
