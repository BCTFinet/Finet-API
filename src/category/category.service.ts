import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from 'src/schema/category.schema';
import { Model, Types } from 'mongoose';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel : Model<CategoryDocument>
  ){}

  async create(categoryDto: CreateCategoryDto) : Promise<CategoryDocument> {
    try {
      return await this.categoryModel.create({
        name: categoryDto.title,
      });
    }
    catch (error) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async findAll() : Promise<CategoryDocument[] | null> {
    try{
      return await this.categoryModel.find().exec();
    }
    catch (error) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }
  
  async findOne(_id: Types.ObjectId) : Promise<CategoryDocument | null> {
    try {
      return await this.categoryModel.findById({_id}).exec();
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async update(_id: Types.ObjectId, categoryDto: UpdateCategoryDto) : Promise<CategoryDocument> {
    try {
      const category = await this.categoryModel.findOneAndUpdate(
        { _id },
        { title : categoryDto.title },
        { new : true }
      );

      if (!category) {
        throw new NotFoundException('Category Not Found');
      }

      return category;
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async remove(_id: Types.ObjectId) : Promise<CategoryDocument> {
    try {
      const category =  await this.categoryModel.findByIdAndDelete({ _id });
      
      if (!category) {
        throw new NotFoundException('Category Not Found');
      }

      return category;
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
