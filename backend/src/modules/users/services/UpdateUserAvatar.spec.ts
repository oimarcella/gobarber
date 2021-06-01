import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';

let fakeUserRepository: FakeUserRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatarService: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
	beforeEach(() => {
		fakeUserRepository = new FakeUserRepository();
		fakeStorageProvider = new FakeStorageProvider();

		updateUserAvatarService = new UpdateUserAvatarService(
			fakeUserRepository,
			fakeStorageProvider,
		);
	});
	it('should be able to update avatar', async () => {
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
		await expect(
			updateUserAvatarService.execute({
				user_id: 'id_test',
				avatarFilename: 'johndoe_profile',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
	it('should be able to delete old avatar and set a new one', async () => {
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
