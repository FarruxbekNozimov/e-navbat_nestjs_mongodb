import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ExampleDocument = HydratedDocument<Example>;

@Schema()
export class Example {
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Specialist' }])
	spec_id:mongoose.Schema.Types.ObjectId;

	@Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }])
	service_id:mongoose.Schema.Types.ObjectId;

	@Prop()
	spec_service_price:string;

	
}

export const ExampleSchema = SchemaFactory.createForClass(Example);
