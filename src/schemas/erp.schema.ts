import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ERPDocument = HydratedDocument<ERP>;

@Schema()
export class ERP {}

export const ERPSchema = SchemaFactory.createForClass(ERP);
