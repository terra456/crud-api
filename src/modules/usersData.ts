import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { UserType } from './types.ts';

class UsersData {
  users: Array<UserType>;

  constructor() {
    this.users = [];
  }

  async getUsers() {
    return JSON.stringify(this.users);
  }

  async getUser(str: string) {
    const answer = new Promise((res, rej) => {
      const user = this.users.find((el) => el.id === str);
      if (user) {
        res(user);
      } else {
        rej(new Error('user not found'));
      }      
    });
    return answer;
  }

  async validateUuid(str: string) {
    const answer = new Promise((res, rej) => {
      if (uuidValidate(str)) {
        res(str);
      } else {
        rej(new Error('userId is invalid'));
      }
    });
    return answer;
  }

  async createUser(obj: any) {
    const user: UserType = this.checkUserFields(obj);
    const answer = new Promise((res, rej) => {
      if (user) {
        this.users.push(user);
        res(user);
      } else {
        rej(new Error('request does not contain required fields'));
      }
    });
    return answer;
  }

  private checkUserFields(obj: any) {
    const user = obj;
    if (user.name && Number(user.age) && user.hobbies) {
      const newUser: UserType = {
        id: uuidv4(),
        name: user.name,
        age: Number(user.age),
        hobbies: user.hobbies.split(','),
      }
      return newUser;
    } else {
      return false;
    }
  }

  async updateUser(currentId: string, obj: any) {
    const answer = new Promise((res, rej) => {
      if (uuidValidate(currentId)) {
        const userIndex = this.users.findIndex((el) => el.id === currentId);
        const user = this.users[userIndex];
        for (let key in user) {
          if (obj[key]) {
            user[key] = obj[key];
          }
        }
        res(user);
      } else {
        rej(new Error('user does not found'));
      }
    });
    return answer;
  }

  async deleteUser(currentId: string) {
    const answer = new Promise((res, rej) => {
      const userIndex = this.users.findIndex((el) => el.id === currentId);
      if (userIndex >= 0) {
        const deletedUser = this.users.splice(userIndex, 1);
        res(deletedUser);
      } else {
        rej(new Error('user does not found'));
      }
    });
    return answer;
  }
}

export default UsersData;