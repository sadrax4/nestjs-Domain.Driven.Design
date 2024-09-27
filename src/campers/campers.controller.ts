import { Controller, Get, Param } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

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

}
