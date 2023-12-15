import { Injectable } from "@nestjs/common";
import { CamperSchema } from "./camper.schema";
import { Model } from "mongoose";
import { CamperDto } from "../camper.dto";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class CamperDtoRepository {
    constructor(
        @InjectModel(CamperSchema.name)
        private readonly camperModel: Model<CamperSchema>
    ) { }

    async findAll(): Promise<CamperDto[]> {
        const campers = await this.camperModel.find({}, {}, { lean: true });
        return campers.map(camper => {
            const allergiesToLower = camper.allergies.map(allergy => allergy.toLocaleLowerCase());
            const isAllergyToPeanuts = allergiesToLower.includes("peanuts");
            return {
                ...camper,
                isAllergyToPeanuts
            }
        })
    }

    async findById(id: string): Promise<CamperDto> {
        const campers = (await this.camperModel.find({}, {}, { lean: true }));
        const camper = campers.find(camper => camper._id.toHexString() == id);
        console.log(camper);
        const isAllergyToPeanuts = camper.allergies.map(
            allergy => allergy.toLocaleLowerCase()
        ).includes("peanuts");
        return {
            ...camper,
            isAllergyToPeanuts
        }
    }
}