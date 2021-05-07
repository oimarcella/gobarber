import { uuid } from 'uuidv4';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';

class UsersRepository implements IUsersRepository {
	private users: User[] = [];

	public async findByEmail(email: string): Promise<User | undefined> {
		const user = this.users.find(userElem => userElem.email === email);
		return user;
	}

	public async findById(id: string): Promise<User | undefined> {
		const user = this.users.find(userElem => userElem.id === id);
		return user;
	}

	public async create(data: ICreateUserDTO): Promise<User> {
		const user = new User();

		Object.assign(user, { id: uuid() }, data);
		this.users.push(user);

		return user;
	}

	public async save(user: User): Promise<User> {
		const findByIndex = this.users.findIndex(
			userIndex => userIndex.id === user.id,
		);

		this.users[findByIndex] = user;
		return user;
	}
}

export default UsersRepository;
