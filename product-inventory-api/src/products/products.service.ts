import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Products } from './entities/products.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { count } from 'console';
import { PartialUpdateProductDto } from './dto/partial-update-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Products)
        private readonly productRepository: Repository<Products>
    ) {}

    async create(dto: CreateProductDto) {
        const product = this.productRepository.create(dto);
        const saved = await this.productRepository.save(product);
        return {
            message: "Product created successfully.",
            data: saved,
        }
    }
    async findAll() {
        const products = await this.productRepository.find({
            order: {createdAt: 'DESC'}
        });
        return {
            message: "Products retrieved successfully.",
            count: products.length,
            data: products,
        };
    }

    async findOne(id: number) {
        const product = await this.productRepository.findOne({where: {id}});
        if(!product){
            throw new NotFoundException(`Product with id ${id} not found.`);
        }
        return {
            message: "Product fetched successfully.",
            data: product,
        };

    }
    async update(id:number, dto:PartialUpdateProductDto){
        await this.findOne(id);
        await this.productRepository.update(id, dto);
        const updated = await this.productRepository.findOne({where: {id}});
        return {
            message: "Product updated successfully.",
            data: updated,
        }
    }

    async replace(id: number, dto: UpdateProductDto) {
        await this.findOne(id);
        const product = this.productRepository.create({id, ...dto});
        const saved = await this.productRepository.save(product);
        return {
            message: "Product replaced successfully.",
            data: saved,
        }
    }


    async remove(id: number) {
        await this.findOne(id);
        await this.productRepository.delete(id);
        return {
            message: "Product deleted successfully.",
            id,
        }
    }

    async findByCategory(category: string) {
        const products = await this.productRepository.find({where:{category},
            order: {createdAt: 'DESC'}});
        return {
            message: `Products in category '${category}' retrieved successfully.`,
            count: products.length,
            data: products,
        }
    }

    async search(keyword: string) {
        const products = await this.productRepository.find(
            {where: {
                name: ILike(`%${keyword}%`),
                description: ILike(`%${keyword}%`)
            }}
        )
        return {
            message: `Products matching keyword '${keyword}' retrieved successfully.`,
            count: products.length,
            data: products,
        }
    }
    
    async toggleActive(id: number) {
        const {data:product} = await this.findOne(id);
        product.isActive = !product.isActive;

        const saved= await this.productRepository.save(product);    
        return {
            message: `Product ${product.isActive ? 'activated' : 'deactivated'} successfully.`,
            data: saved,
        }
    }




}
