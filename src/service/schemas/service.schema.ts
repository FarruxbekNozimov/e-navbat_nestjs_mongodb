import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ExampleDocument = HydratedDocument<Example>;

@Schema()
export class Example {
  @Prop({ required: true })
	service_name:string;

	@Prop({ required: true })
	service_price:string;

	
}

export const ExampleSchema = SchemaFactory.createForClass(Example);
