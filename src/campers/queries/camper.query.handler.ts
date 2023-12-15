import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { CamperQuery } from "./camper.query";
import { CamperDtoRepository } from '../db/camper-dto.repository';
import { CamperDto } from "../camper.dto";

@QueryHandler(CamperQuery)
export class CamperQueryHandler implements IQueryHandler<CamperQuery>{
    constructor(
        private camperDtoRepository: CamperDtoRepository
    ) { }
    async execute(query: CamperQuery): Promise<CamperDto[] | CamperDto> {
        if (query.id) {
            return this.camperDtoRepository.findById(query.id);
        }
        return this.camperDtoRepository.findAll();
    }
}