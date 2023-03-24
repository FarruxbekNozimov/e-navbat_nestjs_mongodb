import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ExampleDocument = HydratedDocument<Example>;

@Schema()
export class Example {
  @Prop()
	table_name:string;

	@Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'SpecService' }])
	user_id:mongoose.Schema.Types.ObjectId;

	@Prop()
	user_os:string;

	@Prop()
	user_device:string;

	@Prop()
	token:string;

	
}

export const ExampleSchema = SchemaFactory.createForClass(Example);
