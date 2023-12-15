import { EntitySchemaFactory } from "src/database/entity-schema.factory";
import { CamperSchema } from "./camper.schema";
import { Camper } from "../Camper";
import { ObjectId } from "mongodb";

export class CamperSchemaFactory implements EntitySchemaFactory<CamperSchema, Camper>{
    create(entity: Camper): CamperSchema {
        return {
            _id: new ObjectId(entity.getId()),
            name: entity.getName(),
            age: entity.getAge(),
            allergies: entity.getAllergies()
        }
    }
    createFromSchema(entitySchema: CamperSchema): Camper {
        return new Camper(
            entitySchema._id.toHexString(),
            entitySchema.name,
            entitySchema.age,
            entitySchema.allergies
        )
    }
}