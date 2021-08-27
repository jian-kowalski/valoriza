import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IUserValidation {
  user_id: string;
}

class ValidationUserService {
  async isUserAdmin({ user_id }: IUserValidation) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    const user = await usersRepositories.findOne(user_id);
    return user.admin;
  }
}

export { ValidationUserService };
