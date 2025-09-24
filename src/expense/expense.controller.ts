import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UnauthorizedException, UseGuards, ValidationPipe } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ExpenseDto } from './dto/expense.dto';
import { Types } from 'mongoose';
import { Expense, ExpenseDocument } from 'src/schema/expense.schema';

@Controller('expense')
export class ExpenseController {
    constructor(private readonly expenseService : ExpenseService){}
    
    //  ROUTES : /expense
    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Req() req)  : Promise<{message : string, data : ExpenseDocument[] | null}> {
        const expense = await this.expenseService.findAll(req.user.userId);
        
        return {
            message : "Succesfully fetched all expenses!",
            data : expense,
        };
    }
    
    //  ROUTES : /expense
    @UseGuards(JwtAuthGuard)
    @Post()
    async createExpense(@Body(new ValidationPipe()) body : ExpenseDto, @Req() req) : Promise<{message : string, data : ExpenseDocument}> {
        const expense = await this.expenseService.addExpense(body, req.user.userId);
        
        return {
            message : "Succesfully created an expense!",
            data : expense,
        };
    }
    
    //  ROUTES : /expense/:id
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Param('id') expense_id : Types.ObjectId, @Req() req, @Body() body : ExpenseDto) : Promise<{message : string, data : ExpenseDocument}> {
        const updatedExpense = await this.expenseService.updateExpense(body, req.user.userId, expense_id);
        
        return {
            message: 'Successfully updated an expense!',
            data: updatedExpense
        };
    }
    
    //  ROUTES : /expense/:id
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') expense_id : Types.ObjectId, @Req() req) : Promise<{message : string}> {
        await this.expenseService.deleteExpense(req.user.userId, expense_id);

        return {
            message: 'Successfully deleted an expense!',
        };
    }
}
