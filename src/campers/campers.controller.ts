import { Controller, Get, Param } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CamperDto } from './camper.dto';
import { CampersQuery } from './queries/camper.query';

@Controller('campers')
export class CampersController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    @Get(':id')
    async getCamper(
        @Param('id') camperId: string
    ): Promise<void> { }

    @Get()
    async getCampers(): Promise<CamperDto[]> {
        return this.queryBus.execute<CampersQuery, CamperDto[]>(
            new CampersQuery()
        );
    }

}
