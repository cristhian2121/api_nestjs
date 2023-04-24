import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProcedureOrderDocument = HydratedDocument<ProcedureOrder>;

@Schema()
export class ProcedureOrder {}

export const ProcedureOrderSchema =
  SchemaFactory.createForClass(ProcedureOrder);
