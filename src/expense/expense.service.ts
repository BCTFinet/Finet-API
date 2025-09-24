import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Expense, ExpenseDocument } from 'src/schema/expense.schema';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpenseService {
    constructor (
        @InjectModel(Expense.name) 
        private expenseModel: Model<ExpenseDocument>,
    ){}

    // Get All Expense
    async findAll(user_id : Types.ObjectId) : Promise<ExpenseDocument[] | null> {
        return this.expenseModel.find({user_id}).exec();
    }
s
    // Create Expense
    async addExpense(input : CreateExpenseDto, user_id : string) : Promise<ExpenseDocument> {
        try{
            return await this.expenseModel.create({
                user_id,
                name : input.name, 
                price : input.price,
                note : input.note
            });
        }

        catch(error){
            throw new InternalServerErrorException(error.message);
        }
    }
    
    // Update Expense
    async updateExpense(input : UpdateExpenseDto, user_id : Types.ObjectId, expense_id : Types.ObjectId) : Promise<ExpenseDocument> {
        try{
            const expense =  await this.expenseModel.findOneAndUpdate(
                { _id : expense_id, user_id },
                { name : input.name, price : input.price, note : input.note},
                { new : true }
            );

            if (!expense) {     
                throw new NotFoundException('Expense not found');
            }

            return expense;
        }

        catch(error){
            throw new InternalServerErrorException(error.message);
        }
    }
    
    // Delete Expense
    async deleteExpense(user_id: Types.ObjectId, expense_id : Types.ObjectId) : Promise<ExpenseDocument> {
        try{
            const user =  await this.expenseModel.findOneAndDelete({_id : expense_id, user_id})

            if (!user) {
                throw new NotFoundException('Expense not found');
            }

            return user;
        }
        catch(error){
            throw new InternalServerErrorException(error.message);
        }
    }
}
