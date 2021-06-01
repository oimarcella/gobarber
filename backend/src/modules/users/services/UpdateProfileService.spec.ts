import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUserRepository;
let updateProfileService: UpdateProfileService;
let fakeHashProvider: FakeHashProvider;

describe('UpdateProfile', () => {
	beforeEach(() => {
		fakeUserRepository = new FakeUserRepository();
		fakeHashProvider = new FakeHashProvider();
		updateProfileService = new UpdateProfileService(
			fakeUserRepository,
			fakeHashProvider,
		);
	});
	it('should be able to update email, name and password', async () => {
		const user = await fakeUserRepository.create({
			name: 'John Doe',
			email: 'johndoe@test.com',
			password: 'myfirstpassword',
		});

		await updateProfileService.execute({
			user_id: user.id,
			email: 'john2@test.com',
			name: 'Jhonny Doe',
			old_password: 'myfirstpassword',
			password: 'newpassword',
		});

		expect(user.name).toBe('Jhonny Doe');
		expect(user.email).toBe('john2@test.com');
		expect(user.password).toBe('newpassword');
	});
	it('should not be able to update password if old password informed is incorrect', async () => {
		const user = await fakeUserRepository.create({
			name: 'John Doe',
			email: 'johndoe@test.com',
			password: 'myfirstpassword',
		});

		await expect(
			updateProfileService.execute({
				user_id: user.id,
				email: 'johndoe@test.com',
				name: 'John Doe',
				old_password: 'wrong',
				password: 'newpassword',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
