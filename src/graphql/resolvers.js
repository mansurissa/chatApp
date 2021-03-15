import { UserInputError } from 'apollo-server';
import { User } from '../database/models';
import { findUser, findUsers } from '../services/userServices';
import { decryptPassword, encryptPassword, signToken } from '../utils/auth';
import { validateCreate } from '../validators/userValidator';

export default {
  Query: {
    getUsers: async () => {
      try {
        const users = await findUsers();
        return users;
      } catch (error) {
        console.log(error);
      }
    },
    signin: async (_, args) => {
      try {
        const user = await findUser({ email: args.email });
        if (!user) {
          throw new UserInputError('User not found', '');
        }
        const isReal = await decryptPassword(args.password, user.password);
        if (!isReal) {
          throw new UserInputError('Incorrect password', '');
        }
        const token = signToken({ id: user.id, email: user.email });
        return user;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  Mutation: {
    register: async (_, args) => {
      const { userName, email, password } = args;
      const hash = await encryptPassword(password);
      let errors = {};

      // Validation
      const validate = validateCreate(args);
      if (validate) {
        throw new UserInputError(validate, '');
      }

      const emailExist = await findUser({ email });
      const userExist = await findUser({ userName });
      if (emailExist) errors.userName = 'UserName already used';
      if (userExist) errors.email = 'Email already used';

      if (Object.keys(errors).length) {
        throw errors;
      }

      try {
        const user = await User.create({
          userName,
          email,
          password: hash,
        });
        return user;
      } catch (error) {
        console.log(error);
        throw new UserInputError('Existing data', { errors: error });
      }
    },
  },
};
