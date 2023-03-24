import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ExampleDocument = HydratedDocument<Example>;

@Schema()
export class Example {
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'SpecService' }])
	spec_id:mongoose.Schema.Types.ObjectId;

	@Prop()
	day_of_week:number;

	@Prop()
	start_time:string;

	@Prop()
	finish_time:string;

	@Prop()
	rest_start_time:string;

	@Prop()
	rest_finish_time:string;

	
}

export const ExampleSchema = SchemaFactory.createForClass(Example);
