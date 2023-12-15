import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { UpdateCamperAllergies } from './update-camper.command';
import { CamperRepository } from '../../db/camper-entity.repository';
import { CamperFactory } from '../../camper.factory';

@CommandHandler(UpdateCamperAllergies)
export class UpdateCamperHandler
    implements ICommandHandler<UpdateCamperAllergies>{
    constructor(
        private eventPublisher: EventPublisher,
        private camperRepository: CamperRepository,
        private camperFactory: CamperFactory
    ) { }

    async execute(command: UpdateCamperAllergies): Promise<any> {
        let { camperId, camperAllergies } = command;
        const camper = this.eventPublisher.mergeObjectContext(
            await this.camperRepository.findOneById(camperId)
        )
        camperAllergies = this.checkDuplicate(camper.getAllergies(), camperAllergies)
        camper.updateAllergies(camperAllergies);
        Promise.all([
            await this.camperRepository.findOneAndReplaceById(camperId, camper),
            await this.camperFactory.updateCamper(camperId)
        ])
        camper.commit();
    }

    checkDuplicate(
        allergies: string[],
        newAllergies: string[]
    ): Array<string> {
        const duplicateResult = allergies.find(allergy => newAllergies.includes(allergy))
        if (duplicateResult) {
            return [];
        }
        return newAllergies;
    }

}