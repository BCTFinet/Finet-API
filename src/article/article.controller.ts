import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleDocument } from '../schema/article.schema';
import { Types } from 'mongoose';

import { ApiOperation, ApiTags, ApiOkResponse, ApiNotFoundResponse, ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';

@ApiTags('Articles')
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  @ApiOperation({ summary: 'Get all articles' })
  @ApiOkResponse({ 
    description: 'Articles retrieved successfully',
    isArray: true
   })
  async findAll() : Promise<{message : string, articles: ArticleDocument[] | null}> {
    const articles = await this.articleService.findAll();

    return {
      message: 'Articles retrieved successfully',
      articles
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an article by ID' })
  @ApiOkResponse({ description: 'Article retrieved successfully' })
  @ApiNotFoundResponse({ description: 'Article not found' })
  async findOne(@Param('id') id: Types.ObjectId) : Promise<{message : string, article : ArticleDocument | null}> {
    const article = await this.articleService.findOne(id);
    
    return {
      message: 'Article retrieved successfully',
      article
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new article' })
  @ApiCreatedResponse({ 
    description: 'Article created successfully',
    type: CreateArticleDto 
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  async create(@Body() createArticleDto: CreateArticleDto) : Promise<{message : string, article : ArticleDocument}> {
    const article = await this.articleService.create(createArticleDto);

    return {
      message : 'Article created successfully',
      article
    }
  }
  
  @Patch(':id')
  @ApiOperation({ summary: 'Update an article by ID' })
  @ApiCreatedResponse({ 
    description: 'Article updated successfully',
    type: UpdateArticleDto 
   })
  @ApiNotFoundResponse({ description: 'Article not found' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  async update(@Param('id') id: Types.ObjectId, @Body() updateArticleDto: UpdateArticleDto) {
    const updatedArticle = await this.articleService.update(id, updateArticleDto);

    return {
      message : 'Article updated successfully',
      article : updatedArticle
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an article by ID' })
  @ApiOkResponse({ description: 'Article deleted successfully' })
  @ApiNotFoundResponse({ description: 'Article not found' })
  async remove(@Param('id') id: Types.ObjectId) : Promise<{message : string}> {
    await this.articleService.remove(id);

    return {
      message : 'Article deleted successfully',
    }
  }
}
