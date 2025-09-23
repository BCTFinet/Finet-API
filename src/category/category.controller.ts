import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Types } from 'mongoose';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const category =  await this.categoryService.create(createCategoryDto);
    
    return {
      message : "Succesfully Created Category",
      category
    }
  }
  
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return await this.categoryService.findAll();
  }
  
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: Types.ObjectId) {
    return await this.categoryService.findOne(id);
  }
  
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: Types.ObjectId, @Body() updateCategoryDto: UpdateCategoryDto) {
    const category =  await this.categoryService.update(id, updateCategoryDto);

    return {
      message : "Succesfully Update Category",
      category
    }
  }
  
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: Types.ObjectId) {
    const category = await this.categoryService.remove(id);
    return {
      message: 'Successfully deleted expense!',
    };
  }
}
