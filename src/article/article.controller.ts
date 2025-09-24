import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleDocument } from 'src/schema/article.schema';
import { Types } from 'mongoose';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async findAll() : Promise<{message : string, articles: ArticleDocument[] | null}> {
    const articles = await this.articleService.findAll();

    return {
      message: 'Articles retrieved successfully',
      articles
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: Types.ObjectId) : Promise<{message : string, article : ArticleDocument | null}> {
    const article = await this.articleService.findOne(id);

    return {
      message: 'Article retrieved successfully',
      article
    };
  }

  @Post()
  async create(@Body() createArticleDto: CreateArticleDto) : Promise<{message : string, article : ArticleDocument}> {
    const article = await this.articleService.create(createArticleDto);

    return {
      message : 'Article created successfully',
      article
    }
  }

  @Patch(':id')
  async update(@Param('id') id: Types.ObjectId, @Body() updateArticleDto: UpdateArticleDto) {
    const updatedArticle = await this.articleService.update(id, updateArticleDto);

    return {
      message : 'Article updated successfully',
      article : updatedArticle
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: Types.ObjectId) : Promise<{message : string}> {
    await this.articleService.remove(id);

    return {
      message : 'Article deleted successfully',
    }
  }
}
