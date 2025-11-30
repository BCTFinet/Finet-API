import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from '../schema/category.schema';
import { Expense, ExpenseSchema } from 'src/schema/expense.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {name : Category.name, schema : CategorySchema},
    {name : Expense.name, schema : ExpenseSchema}
  ])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
