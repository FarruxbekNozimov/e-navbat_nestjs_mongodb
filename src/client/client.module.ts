import { Module } from '@nestjs/common';
import { ExampleService } from './client.service';
import { ExampleController } from './client.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Example, ExampleSchema } from './schemas/client.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Example.name, schema: ExampleSchema }]),
  ],
  controllers: [ExampleController],
  providers: [ExampleService],
})
export class ExampleModule {}
