import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Types } from 'mongoose';
import { CategoryDocument } from 'src/schema/category.schema';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() req) : Promise<{message : string, categories : CategoryDocument[] | null}>{
    const categories = await this.categoryService.findAll(req.user.userId);

    return {
      message : "Succesfully Fetched All Categories",
      categories
    }
  }
  
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: Types.ObjectId, @Req() req) : Promise<{message : string, category : CategoryDocument | null}>{
    const category = await this.categoryService.findOne(id, req.user.userId);

    return {
      message : "Succesfully Fetched One Category",
      category
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body(new ValidationPipe()) createCategoryDto: CreateCategoryDto, @Req() req) : Promise<{message : string, category : CategoryDocument}>{
    const category =  await this.categoryService.create(createCategoryDto, req.user.userId);
    
    return {
      message : "Succesfully Created Category",
      category
    }
  }
  
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: Types.ObjectId, @Body() updateCategoryDto: UpdateCategoryDto, @Req() req) : Promise<{message : string, category : CategoryDocument}>{
    const category =  await this.categoryService.update(id, updateCategoryDto, req.user.userId);

    return {
      message : "Succesfully Update Category",
      category
    }
  }
  
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: Types.ObjectId, @Req() req) : Promise<{message : string}> {
    await this.categoryService.remove(id, req.user.userId);
    
    return {
      message: 'Successfully deleted category!',
    };
  }
}
