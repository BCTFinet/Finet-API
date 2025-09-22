import { Module } from '@nestjs/common';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';
import { Expense, ExpenseSchema } from '../schema/expense.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature(
        [{name : Expense.name, schema : ExpenseSchema}]
    )],
    providers : [ExpenseService],
    controllers : [ExpenseController]
})

export class ExpenseModule {}
