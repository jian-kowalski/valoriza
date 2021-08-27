import { Request, Response } from "express";
import { ListUserSendComplimentsService } from "../services/ListUserSendComplimentsService";

class ListUserSendComplimentsController {
  async handle(request: Request, response: Response) {
    const userSendCompliments = new ListUserSendComplimentsService();
    const compliments = await userSendCompliments.getList(request.user_id);
    return response.json(compliments);
  }
}

export { ListUserSendComplimentsController };
