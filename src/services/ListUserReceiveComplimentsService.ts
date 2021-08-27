import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";

class ListUserReceiveComplimentsService {
  async getList(user_id: string) {
    const complimentsRepositories = getCustomRepository(ComplimentsRepositories);

    console.log(user_id);
    
     return complimentsRepositories.find({
      where: {
        user_receiver: user_id,
      },
      relations: ["userSender", "userReceiver", "tag"],
    });
  }
}

export { ListUserReceiveComplimentsService };
