import { Request, Response } from "express";
import { ListTagsService } from "../services/ListTagsServices";

class ListTagsController {
    async handle(request: Request, response: Response) {
        const listTagsService = new ListTagsService;

        const tags = await listTagsService.getList();

        return response.json(tags);
    }

}

export { ListTagsController };