import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('expense')
export class ExpenseController {
    constructor(private expenseService : ExpenseService){}

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async createExpense(@Body() body : {name : string, price : number}, @Req() req){
        const expense = await this.expenseService.addExpense(body, req.user.userId);
        
        if (!expense){
            return {message : "Failed to Create Account!"}
        }
        
        return {message : "Succesfully Created an Account!"}
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Req() req) {
        return this.expenseService.findAll(req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('update/:id')
    async update(@Param('id') expense_id : string, @Req() req, @Body() body : {name : string, price: number}) {
        return this.expenseService.updateExpense(body, req.user.userId, expense_id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    async delete(@Param('id') expense_id : string, @Req() req) {
        return this.expenseService.deleteExpense(req.user.userId, expense_id);
    }
}
