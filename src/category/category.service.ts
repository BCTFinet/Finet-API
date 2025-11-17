import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from '../schema/category.schema';
import { Model, Types } from 'mongoose';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel : Model<CategoryDocument>
  ){}

  async create(categoryDto: CreateCategoryDto, user_id : string) : Promise<CategoryDocument> {
    try{
      return await this.categoryModel.create({
        name: categoryDto.name,
        user_id
      });
    }
    catch(error){
      throw new InternalServerErrorException(error.message);
   } 
  }

  async findAll(user_id: Types.ObjectId) : Promise<CategoryDocument[] | null> {
    return await this.categoryModel.find({user_id}).exec();
  }
  
  async findOne(_id: Types.ObjectId, user_id : Types.ObjectId) : Promise<CategoryDocument> {
    try{
      const category = await this.categoryModel.findOne({_id, user_id}).exec();
  
      if (!category) {
        throw new NotFoundException('Category Not Found');
      }
  
      return category;
    }
    catch(error){
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(_id: Types.ObjectId, categoryDto: UpdateCategoryDto, user_id : Types.ObjectId) : Promise<CategoryDocument> {
    try{
      const category = await this.categoryModel.findOneAndUpdate(
        { _id, user_id },
        { name : categoryDto.name },
        { new : true }
      );

      if (!category) {
        throw new NotFoundException('Category Not Found');
      }

      return category;
    } 
    catch(error){
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(_id: Types.ObjectId, user_id : Types.ObjectId) : Promise<CategoryDocument> {
    try{
      const category =  await this.categoryModel.findOneAndDelete({ _id, user_id });

      if (!category) {
        throw new NotFoundException('Category Not Found');
      }

      return category;
    }
    catch(error){
      throw new InternalServerErrorException(error.message);
    }
  }
}