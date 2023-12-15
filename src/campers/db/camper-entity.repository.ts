import { BaseEntityRepository } from "src/database/base-entity.repository";
import { CamperSchema } from './camper.schema';
import { Camper } from "../Camper";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CamperSchemaFactory } from "./camper-schema.factory";
import { Model } from "mongoose";

@Injectable()
export class CamperRepository extends BaseEntityRepository<CamperSchema, Camper>{
    constructor(
        @InjectModel(CamperSchema.name)
        camperModel: Model<CamperSchema>,
        camperFactory: CamperSchemaFactory
    ) {
        super(camperModel, camperFactory);
    }
}