import { User } from '../database/models';
import { encryptPassword } from '../utils/auth';

export default {
  Query: {
    getUsers: async () => {
      try {
        const users = await User.findAll();
        return users;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    register: async (_, args) => {
      const { userName, email, password } = args;
      const hash = await encryptPassword(password);
      try {
        const user = await User.create({
          userName,
          email,
          password: hash,
        });
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};
