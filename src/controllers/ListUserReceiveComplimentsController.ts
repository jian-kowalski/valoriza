import { Request, Response } from "express";
import { ListUserReceiveComplimentsService } from "../services/ListUserReceiveComplimentsService";

class ListUserReceiveComplimentsController {
    async handle(request: Request, response: Response) {
        const userReceiveCompliments = new ListUserReceiveComplimentsService();
        const compliments = await userReceiveCompliments.getList(request.user_id);
        return response.json(compliments);
    }
}

export { ListUserReceiveComplimentsController };