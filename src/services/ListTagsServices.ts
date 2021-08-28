import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";

class ListTagsService {
  async getList() {
    const tagsRespositories = getCustomRepository(TagsRepositories);
    const tags = await tagsRespositories.find();
    return classToPlain(tags);
  }
}

export { ListTagsService };
