import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ExampleDocument = HydratedDocument<Example>;

@Schema()
export class Example {
  @Prop()
	otp:string;

	@Prop()
	expiration_time:number;

	@Prop()
	verified:boolean;

	
}

export const ExampleSchema = SchemaFactory.createForClass(Example);
