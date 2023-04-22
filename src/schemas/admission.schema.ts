import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdmissionDocument = HydratedDocument<Admission>;

@Schema()
export class Admission {}

export const AdmissionSchema = SchemaFactory.createForClass(Admission);
