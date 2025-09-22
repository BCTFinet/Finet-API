import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Expense, ExpenseDocument } from 'src/schema/expense.schema';

type ExpenseInput = {name : string, price : number}; 

@Injectable()
export class ExpenseService {
    constructor (
        @InjectModel(Expense.name) 
        private expenseModel: Model<ExpenseDocument>,
    ){}

    // Get All Expense
    async findAll(user_id : string) : Promise<ExpenseDocument[] | null> {
        return this.expenseModel.find({user_id}).exec();
    }
s
    // Create Expense
    async addExpense(input : ExpenseInput, user_id : string) : Promise<ExpenseDocument | null> {
        return await this.expenseModel.create({
            name : input.name, 
            price : input.price,
            user_id 
        });
    }
    
    // Update Expense
    async updateExpense(input : ExpenseInput, user_id : string, expense_id : string) : Promise<ExpenseDocument | null> {
        return await this.expenseModel.findOneAndUpdate(
            { _id : expense_id, user_id },
            { name : input.name, price : input.price},
            { new : true }
        );
    }

    // Delete Expense
    async deleteExpense(user_id: string, expense_id : string) {
        return await this.expenseModel.findOneAndDelete({_id : expense_id, user_id})
    }
}
