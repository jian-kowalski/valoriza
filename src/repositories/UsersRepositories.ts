import { Repository } from "typeorm";
import { User } from "../Entities/User";

class UsersRespositories extends Repository<User> {}

export { UsersRespositories };