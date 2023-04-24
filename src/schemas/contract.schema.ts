import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ContractDocument = HydratedDocument<Contract>;

@Schema()
export class Contract {}

export const ContractSchema = SchemaFactory.createForClass(Contract);
