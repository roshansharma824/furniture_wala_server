import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Category {
  SOFA = 'Sofa',
  CHAIR = 'Chair',
  TABLE = 'Table',
  KITCHEN = 'Kitchen',
  LAMP = 'Lamp',
  CUPBOARD = 'Cupboard',
  VASE = 'Vase',
  OTHERS = 'Others',
}

@Schema({
  timestamps: true,
})
export class Product {
  @Prop()
  name: string;

  @Prop()
  price: string;

  @Prop()
  description: string;

  @Prop()
  quantity: number;

  @Prop()
  images: [string];

  @Prop()
  category: Category;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
