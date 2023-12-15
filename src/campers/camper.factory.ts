import { ObjectId } from "mongodb";
import { Camper } from "./Camper";
import { EntityFactory } from "src/database/entity.factory";
import { CamperCreatedEvent } from "./events/create/camper-created.event";
import { CamperRepository } from "./db/camper-entity.repository";
import { Injectable } from "@nestjs/common";
import { UpdateCamperEvent } from "./events/update/camper-updated.event";

@Injectable()
export class CamperFactory implements EntityFactory<Camper> {
    constructor(
        private camperRepository: CamperRepository
    ) { }
    async create(
        name: string,
        age: number,
        allergies: string[]
    ): Promise<Camper> {
        const camper = new Camper(
            new ObjectId().toHexString(),
            name,
            age,
            allergies
        )
        try {
            await this.camperRepository.create(camper);
        } catch (error) {
            console.log(error);
            throw error;
        }
        camper.apply(
            new CamperCreatedEvent(camper.getId())
        )
        return camper;
    }
    async updateCamper(
        camperId: string,
    ): Promise<void> {
        const camper = await this.camperRepository.findOneById(camperId);
        camper.apply(
            new UpdateCamperEvent(camper.getId(), camper.getName())
        )
        return;
    }
} 
