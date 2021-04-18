import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
	it('should be able to create a new user', async () => {
		const fakeUserRepository = new FakeUserRepository();
		const createUserService = new CreateUserService(fakeUserRepository);

		const userCreated = await createUserService.execute({
			name: 'John Doe',
			email: 'johndoe@teste.com',
			password: 'teste',
		});

		expect(userCreated.name).toBe('John Doe');
	});
	it('should not be able to create two users with same email', async () => {
		const fakeUserRepository = new FakeUserRepository();
		const createUserService = new CreateUserService(fakeUserRepository);

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
