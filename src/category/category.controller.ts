import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Types } from 'mongoose';
import { CategoryDocument } from '../schema/category.schema';

import { ApiTags, ApiOkResponse, ApiOperation, ApiNotFoundResponse, ApiCreatedResponse, ApiBadRequestResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Categories')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Get all categories' })
  @ApiOkResponse({ 
    description: 'Categories retrieved successfully', isArray: true 
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() req) : Promise<{message : string, categories : CategoryDocument[] | null}>{
    const categories = await this.categoryService.findAll(req.user.userId);

    return {
      message : "Succesfully Fetched All Categories",
      categories
    }
  }
  
  @ApiOperation({ summary: 'Get a category by ID' })
  @ApiOkResponse({ description: 'Category retrieved successfully' })
  @ApiNotFoundResponse({ description: 'Category not found' })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: Types.ObjectId, @Req() req) : Promise<{message : string, category : CategoryDocument | null}>{
    const category = await this.categoryService.findOne(id, req.user.userId);

    return {
      message : "Succesfully Fetched One Category",
      category
    };
  }

  @ApiOperation({ summary: 'Create a new category' })
  @ApiCreatedResponse({ 
    description: 'Category created successfully',
    type: CreateCategoryDto
  })
  @ApiBadRequestResponse({ description: 'Invalid category data' })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body(new ValidationPipe()) createCategoryDto: CreateCategoryDto, @Req() req) : Promise<{message : string, category : CategoryDocument}>{
    const category =  await this.categoryService.create(createCategoryDto, req.user.userId);
    
    return {
      message : "Succesfully Created Category",
      category
    }
  }
  
  @ApiOperation({ summary: 'Update a category by ID' })
  @ApiCreatedResponse({ description: 'Category updated successfully', type: UpdateCategoryDto })
  @ApiNotFoundResponse({ description: 'Category not found' })
  @ApiBadRequestResponse({ description: 'Invalid category data' })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: Types.ObjectId, @Body() updateCategoryDto: UpdateCategoryDto, @Req() req) : Promise<{message : string, category : CategoryDocument}>{
    const category =  await this.categoryService.update(id, updateCategoryDto, req.user.userId);

    return {
      message : "Succesfully Update Category",
      category
    }
  }
  
  @ApiOperation({ summary: 'Delete a category by ID' })
  @ApiOkResponse({ description: 'Category deleted successfully' })
  @ApiNotFoundResponse({ description: 'Category not found' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: Types.ObjectId, @Req() req) : Promise<{message : string}> {
    await this.categoryService.remove(id, req.user.userId);
    
    return {
      message: 'Successfully deleted category!',
    };
  }
}
