import { Module } from '@nestjs/common';
import { ExampleService } from './token.service';
import { ExampleController } from './token.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Example, ExampleSchema } from './schemas/token.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Example.name, schema: ExampleSchema }]),
  ],
  controllers: [ExampleController],
  providers: [ExampleService],
})
export class ExampleModule {}
