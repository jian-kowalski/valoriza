import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

class ListUsersService {
  async getList() {
    const usersRespositories = getCustomRepository(UsersRepositories);
    return classToPlain(usersRespositories.find());
  }
}

export { ListUsersService };
