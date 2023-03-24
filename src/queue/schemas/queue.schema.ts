import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ExampleDocument = HydratedDocument<Example>;

@Schema()
export class Example {
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'SpecService' }])
	spec_service_id:mongoose.Schema.Types.ObjectId;

	@Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Client' }])
	client_id:mongoose.Schema.Types.ObjectId;

	@Prop({ required:true })
	queue_date_time:string;

	@Prop({ required:true })
	queue_number:number;

	
}

export const ExampleSchema = SchemaFactory.createForClass(Example);
