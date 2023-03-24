import { Module } from '@nestjs/common';
import { ExampleService } from './service.service';
import { ExampleController } from './service.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Example, ExampleSchema } from './schemas/service.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Example.name, schema: ExampleSchema }]),
  ],
  controllers: [ExampleController],
  providers: [ExampleService],
})
export class ExampleModule {}
