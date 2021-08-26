import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepository = getCustomRepository(UsersRepositories);
    const user = await this.validUser(usersRepository, email);

    await this.validPassword(password, user);

    return this.generateToken(user);
  }

  private async validUser(usersRepository: UsersRepositories, email: string) {
    const user = await usersRepository.findOne({ email });
    if (!user) {
      this.createExceptionLogingNotValid();
    }
    return user;
  }

  private async validPassword(password: string, user: User) {
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      this.createExceptionLogingNotValid();
    }
  }

  private createExceptionLogingNotValid() {
    throw new Error("Email/Password incorrect");
  }
  
  private generateToken(user: User): string {
    return sign(
      {
        email: user.email,
      },
      "ed41df8cbbae16cbb3e43d0d8debe6bd",
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );
  }
}

export { AuthenticateUserService };
