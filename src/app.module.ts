import { Module } from '@nestjs/common';
import { CampersModule } from './campers/campers.module';


@Module({
  imports: [ DatabaseModule, CampersModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
