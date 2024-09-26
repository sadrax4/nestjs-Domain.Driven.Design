import { Module } from '@nestjs/common';
import { CampersController } from './campers.controller';
import { CampersService } from './campers.service';

@Module({
  controllers: [CampersController],
  providers: [CampersService]
})
export class CampersModule {}
