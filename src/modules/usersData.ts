import { UserType } from './types.ts';

class UsersData {
  users: Array<UserType>;

  constructor() {
    this.users = [];
  }

  async getUsers() {
    return JSON.stringify(this.users);
  }

  getUser(id: any) {
    return this.users[id];
  }

  createUser(obj: any) {
    const user = obj;
    this.users.push(user);
  }

  updateUser(obj: any) {
    const user = obj;
  }

  deliteUser(obj: any) {
    const user = obj;
  }
}

export default UsersData;