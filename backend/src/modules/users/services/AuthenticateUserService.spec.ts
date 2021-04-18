// import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
	it('should be able to authenticate user', async () => {
		const fakeUserRepository = new FakeUserRepository();

		const createUserService = new CreateUserService(fakeUserRepository);
		const authenticateUserService = new AuthenticateUserService(
			fakeUserRepository,
		);

		await createUserService.execute({
			name: 'John Doe',
			email: 'johndoe@test.com',
			password: 'johndoe',
		});

		const response = await authenticateUserService.execute({
			email: 'johndoe@test.com',
			password: 'johndoe',
		});

		expect(response).toHaveProperty('authenticationToken');
	});
});
