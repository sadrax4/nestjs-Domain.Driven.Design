import { CreateCamperCommand } from "./create/create-camper-command";
import { CreateCamperHandler } from "./create/create-camper-handler";
import { UpdateCamperAllergies } from "./update/update-camper.command";
import { UpdateCamperHandler } from "./update/update-camper.handler";

export const CamperCommands = [
    CreateCamperCommand,
    CreateCamperHandler,
    UpdateCamperAllergies,
    UpdateCamperHandler
];