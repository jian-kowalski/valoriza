import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";

interface ITagRequest {
  name: string;
}

class CreateTagService {
  async execute({ name }: ITagRequest) {
    const tagsRepository = getCustomRepository(TagsRepositories);

    await this.validarNome(name, tagsRepository);

    const user = tagsRepository.create({ name });

    await tagsRepository.save(user);
    return user;
  }

  private async validarNome(name: string, tagsRepository: TagsRepositories) {
    if (!name) {
      throw new Error("Name incorrect");
    }

    const tagAlreadyExists = await tagsRepository.findOne({ name });

    if (tagAlreadyExists) {
      throw new Error("Tag already existis");
    }
  }
}

export { CreateTagService };
