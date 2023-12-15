import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { UpdateCamperEvent } from "./camper-updated.event";

@EventsHandler(UpdateCamperEvent)
export class UpdateCamperEventHandler implements IEventHandler<UpdateCamperEvent>{
    
    async handle(
        { camperId, camperName }: UpdateCamperEvent
    ): Promise<void> {
        console.log(
            `camper<${camperName}> with this ${camperId} id is updated...`
        );
    }
}