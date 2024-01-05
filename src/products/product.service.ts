import { Injectable } from '@nestjs/common';
import * as Mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from 'src/product/schemas/product.schema';
import { Query } from 'express-serve-static-core';
import { CreateProductDto } from 'src/product/dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Mongoose.Model<Product>,
  ) {}

  async getAll(query: Query): Promise<Product[]> {
    const resPerPage = 2;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const keyword = query.keyword
      ? {
          title: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};

    const product = await this.productModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);

    return product;
  }

  async create(book: CreateProductDto): Promise<Product> {
    const data = Object.assign(book);
    const res = await this.productModel.create(data);
    return res;
  }
}
