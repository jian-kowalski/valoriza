import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password, admin }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepositories);

    await this.validarEmail(email, usersRepository);

    const passwordHash = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      admin,
      password: passwordHash,
    });

    await usersRepository.save(user);
    return user;
  }

  private async validarEmail(
    email: string,
    usersRepository: UsersRepositories
  ) {
    if (!email) {
      throw new Error("Email incorrect");
    }

    const userAlreadyExists = await usersRepository.findOne({ email });

    if (userAlreadyExists) {
      throw new Error("User already existis");
    }
  }
}

export { CreateUserService };
