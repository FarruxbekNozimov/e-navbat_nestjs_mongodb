import { Module } from '@nestjs/common';
import { ExampleService } from './spec-service.service';
import { ExampleController } from './spec-service.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Example, ExampleSchema } from './schemas/spec-service.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Example.name, schema: ExampleSchema }]),
  ],
  controllers: [ExampleController],
  providers: [ExampleService],
})
export class ExampleModule {}
