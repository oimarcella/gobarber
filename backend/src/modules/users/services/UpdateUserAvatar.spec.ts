import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';

describe('UpdateUserAvatar', () => {
	it('should be able to update avatar', async () => {
		const fakeUserRepository = new FakeUserRepository();
		const fakeStorageProvider = new FakeStorageProvider();

		const updateUserAvatarService = new UpdateUserAvatarService(
			fakeUserRepository,
			fakeStorageProvider,
		);

		const user = await fakeUserRepository.create({
			name: 'John Doe',
			email: 'johndoe@test.com',
			password: 'handsome_johndoe',
		});

		await updateUserAvatarService.execute({
			user_id: user.id,
			avatarFilename: 'johndoe_profile',
		});

		expect(user.avatar).toBe('johndoe_profile');
	});
	it('should not be able to update avatar from a non existing user', async () => {
		const fakeUserRepository = new FakeUserRepository();
		const fakeStorageProvider = new FakeStorageProvider();

		const updateUserAvatarService = new UpdateUserAvatarService(
			fakeUserRepository,
			fakeStorageProvider,
		);

		await expect(
			updateUserAvatarService.execute({
				user_id: 'id_test',
				avatarFilename: 'johndoe_profile',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
	it('should be able to delete old avatar and set a new one', async () => {
		const fakeUserRepository = new FakeUserRepository();
		const fakeStorageProvider = new FakeStorageProvider();

		const updateUserAvatarService = new UpdateUserAvatarService(
			fakeUserRepository,
			fakeStorageProvider,
		);

		const user = await fakeUserRepository.create({
			name: 'John Doe',
			email: 'johndoe@test.com',
			password: 'handsome_johndoe',
		});

		await updateUserAvatarService.execute({
			user_id: user.id,
			avatarFilename: 'johndoe_profile',
		});

		await updateUserAvatarService.execute({
			user_id: user.id,
			avatarFilename: 'cool_John',
		});

		expect(user.avatar).toBe('cool_John');
	});
});
