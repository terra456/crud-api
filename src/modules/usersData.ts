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

  getUser(str: string) {
    const answer = new Promise((res, rej) => {
      if (uuidValidate(str)) {
        const user = this.users.find((el) => el.id === str);
        if (user) {
          res(user);
        } else {
          rej(new Error('user not find'));
        }
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

  updateUser(obj: any) {
    const user = obj;
  }

  deliteUser(obj: any) {
    const user = obj;
  }
}

export default UsersData;