import { ProductService } from './product.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { Product } from 'src/product/schemas/product.schema';
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('')
  async findAll(@Query() query: ExpressQuery): Promise<Product[]> {
    return this.productService.getAll(query);
  }

  @Post('')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createBook(
    @Body()
    book: CreateProductDto,
    @Req() req,
  ): Promise<Product> {
    console.log(req);
    return this.productService.create(book);
  }
}
