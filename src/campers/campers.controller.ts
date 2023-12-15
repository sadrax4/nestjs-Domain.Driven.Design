import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateCamperRequest } from './dto/request/create-camper-request.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCamperCommand } from './commands/create/create-camper-command';
import { UpdateCamperAllergies } from './commands/update/update-camper.command';
import { CamperQuery } from './queries/camper.query';
import { CamperDto } from './camper.dto';

@Controller('campers')

export class CampersController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus
  ) { }

  @Patch('update/:id')
  async updateCamperAllergies(
    @Param('id') camperId: string,
    @Body("allergies") updateCamperAllergiesRequest: string[],
  ): Promise<void> {
    await this.commandBus.execute<UpdateCamperAllergies, void>(
      new UpdateCamperAllergies(camperId, updateCamperAllergiesRequest)
    )
  }

  @Get(':id')
  async getCamper(
    @Param('id') camperId: string
  ): Promise<CamperDto> {
    console.log(camperId);
    return this.queryBus.execute<CamperQuery, CamperDto>(
      new CamperQuery(camperId)
    )
  }

  @Get()
  async getCampers(): Promise<CamperDto[]> {
    return this.queryBus.execute<CamperQuery, CamperDto[]>(
      new CamperQuery()
    )
  }

  @Post()
  async createCamper(
    @Body() createCamperRequest: CreateCamperRequest,
  ): Promise<void> {
    await this.commandBus.execute<CreateCamperCommand, void>(
      new CreateCamperCommand(createCamperRequest)
    )
  }

}
