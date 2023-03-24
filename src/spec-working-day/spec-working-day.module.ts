import { Module } from '@nestjs/common';
import { ExampleService } from './spec-working-day.service';
import { ExampleController } from './spec-working-day.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Example, ExampleSchema } from './schemas/spec-working-day.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Example.name, schema: ExampleSchema }]),
  ],
  controllers: [ExampleController],
  providers: [ExampleService],
})
export class ExampleModule {}
