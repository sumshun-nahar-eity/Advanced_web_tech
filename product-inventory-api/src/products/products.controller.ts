import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { PartialUpdateProductDto } from './dto/partial-update-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService){}

    @Post()
    createProduct(@Body() dto: CreateProductDto) {
        return this.productService.create(dto);
    }

    @Get()
    getAllProducts() {
        return this.productService.findAll();
    }

    @Get('search')
    search(@Query('keyword') keyword: string) {
        return this.productService.search(keyword);
    }

    @Get('category/:cat')
    findByCategory(@Param('cat') cat: string) {
        return this.productService.findByCategory(cat);
    }

    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.productService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: PartialUpdateProductDto) {
        return this.productService.update(id, dto);

    }

    @Put(':id')
    replace(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductDto) {
        return this.productService.replace(id, dto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.productService.remove(id);
    }

    @Patch(':id/toggle')
    toggleActive(@Param('id', ParseIntPipe) id: number) {
        return this.productService.toggleActive(id);
    }
}
