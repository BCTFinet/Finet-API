import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Article, ArticleDocument } from 'src/schema/article.schema';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name)
    private readonly articleModel: Model<ArticleDocument>,
  ) {}

  async findAll() : Promise<ArticleDocument[] | null> {
    return this.articleModel.find().exec(); 
  }

  async findOne(id: Types.ObjectId) : Promise<ArticleDocument | null> {
    const article = this.articleModel.findById(id).exec();
    
    if (!article) {
      throw new NotFoundException('Article not found');
    } 

    return article;
  }

  async create(createArticleDto: CreateArticleDto) : Promise<ArticleDocument> {
    try{
      return await this.articleModel.create({
        title: createArticleDto.title,
        content: createArticleDto.content,
        written_date: createArticleDto.written_date,
        author: createArticleDto.author
      });
    }    
    catch(error) {
      throw new InternalServerErrorException(error.message);
    }
  }


  async update(_id: Types.ObjectId, updateArticleDto: UpdateArticleDto) : Promise<ArticleDocument> {
    try{
      const article = await this.articleModel.findByIdAndUpdate(
        {_id},
        { 
          title: updateArticleDto.title,
          content: updateArticleDto.content,
          written_date: updateArticleDto.written_date,
          author: updateArticleDto.author
        },
        {new : true}
      );

      if (!article) {
        throw new NotFoundException('Article not found');
      }

      return article;
    }
    catch(error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: Types.ObjectId) : Promise<ArticleDocument> {
    const article = await this.articleModel.findByIdAndDelete(id);

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return article;
  }
}
