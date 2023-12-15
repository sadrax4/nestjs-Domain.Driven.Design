import { CamperCreatedEvent } from "./create/camper-created.event";
import { CamperCreatedHandler } from "./create/camper-created.handler";
import { UpdateCamperEventHandler } from "./update/camper-update.handler";
import { UpdateCamperEvent } from "./update/camper-updated.event";

export const CamperEvents = [
    CamperCreatedHandler,
    CamperCreatedEvent,
    UpdateCamperEventHandler,
    UpdateCamperEvent
];