import { Request, Response } from "express";
import { ListUsersService } from "../services/ListUsersService";

class ListUsersController{
    async handle(request: Request, response: Response) {
        const listUserService = new ListUsersService();
        const users = await listUserService.getList();

        response.json(users);
    }
}

export { ListUsersController }