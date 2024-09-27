import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CamperDto } from './camper.dto';
import { CampersQuery } from './queries/camper.query';
import { CreateCamperRequest } from './dto/request/create-camper-request.dto';
import { CreateCamperCommand } from './command/create-camper/create.camper.command';

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

    @Post()
    async createCamper(
      @Body() createCamperRequest: CreateCamperRequest,
    ): Promise<void> {
      await this.commandBus.execute<CreateCamperCommand, void>(
        new CreateCamperCommand(createCamperRequest),
      );
    }
  
}
