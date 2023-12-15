import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { CreateCamperCommand } from "./create-camper-command";
import { CamperFactory } from '../../camper.factory';

@CommandHandler(CreateCamperCommand)
export class CreateCamperHandler
    implements ICommandHandler<CreateCamperCommand>{

    constructor(
        private readonly camperFactory: CamperFactory,
        private eventPublisher: EventPublisher
    ) { }

    async execute(
        { createCamperRequest }: CreateCamperCommand
    ): Promise<void> {
        const { name, age, allergies } = createCamperRequest;
        const camper = this.eventPublisher.mergeObjectContext(
            await this.camperFactory.create(name, age, allergies)
        )
        camper.commit();
    }
} 