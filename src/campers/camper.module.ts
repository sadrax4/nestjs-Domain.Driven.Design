import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { CampersController } from "./campers.controller";
import { MongooseModule, SchemaFactory } from "@nestjs/mongoose";
import { CamperSchema } from "./db/camper.schema";
import { CamperRepository } from "./db/camper-entity.repository";
import { CamperSchemaFactory } from "./db/camper-schema.factory";
import { CamperFactory } from "./camper.factory";
import { CamperCommands } from "./commands";
import { CamperEvents } from "./events";
import { CamperQueriesHandler } from "./queries";
import { CamperDtoRepository } from "./db/camper-dto.repository";

@Module({
    imports: [
        CqrsModule,
        MongooseModule.forFeature([{
            name: CamperSchema.name,
            schema: SchemaFactory.createForClass(CamperSchema)
        }])
    ],
    controllers: [
        CampersController
    ],
    providers: [
        CamperRepository,
        CamperDtoRepository,
        CamperSchemaFactory,
        CamperFactory,
        ...CamperCommands,
        ...CamperEvents,
        ...CamperQueriesHandler
    ]
})
export class CampersModule { }