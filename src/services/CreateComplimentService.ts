import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IComplimentResquest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

class CreateComplimentService {
  async execute({
    tag_id,
    user_receiver,
    user_sender,
    message,
  }: IComplimentResquest) {
    const complimentsRepositories = getCustomRepository(
      ComplimentsRepositories
    );

    this.validUserEquals(user_sender, user_receiver);
    this.validUserReciver(user_receiver);
    
    const compliment = complimentsRepositories.create({
      tag_id,
      user_receiver,
      user_sender,
      message
    });

    await complimentsRepositories.save(compliment);
    return compliment;
  }
  private validUserEquals(user_sender: string, user_receiver: string) {
    if (user_sender === user_receiver) {
      throw new Error("Incorrect user Receiver");
    }
  }
  private async validUserReciver(user_receiver: string) {
    const usersRepositories = getCustomRepository(UsersRepositories);
    const userReceiverExists = await usersRepositories.findOne(user_receiver);
    if (!userReceiverExists) {
      throw new Error("User receiver not exists");
    }
  }
}

export { CreateComplimentService };
