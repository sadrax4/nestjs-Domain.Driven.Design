import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { CampersModule } from './campers/camper.module';

@Module({
  imports: [CampersModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
