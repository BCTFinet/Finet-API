import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UnauthorizedException, UseGuards, ValidationPipe } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ExpenseDto } from './dto/expense.dto';
import { Types } from 'mongoose';

@Controller('expense')
export class ExpenseController {
    constructor(private readonly expenseService : ExpenseService){}
    
    //  /expense
    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Req() req) {
        const expense =  this.expenseService.findAll(req.user.userId);
        
        return {
            message : "Succesfully fetched all expenses!",
            data : expense,
        }
    }
    
    //  /expense
    @UseGuards(JwtAuthGuard)
    @Post()
    async createExpense(@Body(new ValidationPipe()) body : ExpenseDto, @Req() req){
        const expense = await this.expenseService.addExpense(body, req.user.userId);
        
        return {
            message : "Succesfully Created an Account!",
            data : expense,
        };
    }
    
    //  /expense:id
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Param('id') expense_id : Types.ObjectId, @Req() req, @Body() body : ExpenseDto) {
        const updatedExpense = await this.expenseService.updateExpense(body, req.user.userId, expense_id);
        
        if (!updatedExpense) {
            throw new UnauthorizedException("Failed to update expense")
        }
        
        return {
            message: 'Successfully updated expense!',
            data: updatedExpense
        };
    }
    
    //  /expense/:id
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') expense_id : Types.ObjectId, @Req() req) {
        const deleted = await this.expenseService.deleteExpense(req.user.userId, expense_id);

        if (!deleted) {
            throw new UnauthorizedException("Failed to delete expense")
        }

        return {
            message: 'Successfully deleted expense!',
        };
    }
}
