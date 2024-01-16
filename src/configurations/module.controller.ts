import { SendController } from "../controllers/sendmail.controller";
import { UseTokenController } from "../controllers/usetoken.controller";
import { ValidateController } from "../controllers/validatetoken.controller";
import { ParentClass } from "./parent.class";

export const moduleControllers: ParentClass[] = [
    new SendController(),
    new ValidateController(),
    new UseTokenController()
];