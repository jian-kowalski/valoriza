import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController";
import { ListUserSendComplimentsController } from "./controllers/ListUsersSendComplimentsController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const createComplimentController = new CreateComplimentController();
const authenticateUserController = new AuthenticateUserController();
const listUserReceiveComplimentsController = new  ListUserReceiveComplimentsController();
const listUserSendComplimentsController = new  ListUserSendComplimentsController();

router.post("/users", createUserController.handle);
router.get("/users/compliments/sends", ensureAuthenticated, listUserSendComplimentsController.handle);
router.get("/users/compliments/receivers", ensureAuthenticated, listUserReceiveComplimentsController.handle);
router.post("/tags", ensureAuthenticated, ensureAdmin, createTagController.handle);
router.post("/compliments", ensureAuthenticated, createComplimentController.handle);
router.post("/login", ensureAdmin, authenticateUserController.handle);

export { router };
