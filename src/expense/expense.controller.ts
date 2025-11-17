import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UnauthorizedException, UseGuards, ValidationPipe } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Types } from 'mongoose';
import { ExpenseDocument } from 'src/schema/expense.schema';

import { ApiBearerAuth, ApiOkResponse, ApiTags, ApiOperation, ApiCreatedResponse, ApiNotFoundResponse, ApiBadRequestResponse } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Expenses')
@Controller('expense')
export class ExpenseController {
    constructor(private readonly expenseService : ExpenseService){}
   
   @ApiOperation({ summary: 'Get all expenses' })
   @ApiBadRequestResponse({ description: 'Invalid request' })
   @ApiOkResponse({ 
        description: 'Successfully fetched all expenses.',
        isArray: true
    })
    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Req() req)  : Promise<{message : string, data : ExpenseDocument[] | null}> {
        const expense = await this.expenseService.findAll(req.user.userId);
        
        return {
            message : "Succesfully fetched all expenses!",
            data : expense,
        };
    }
    
   @ApiOperation({ summary: 'Create a new expense' })
   @ApiCreatedResponse({ 
        description: 'Successfully created an expense.',
        type: CreateExpenseDto
    })
    @ApiBadRequestResponse({ description: 'Invalid expense data' })
    @UseGuards(JwtAuthGuard)
    @Post()
    async createExpense(@Body(new ValidationPipe()) body : CreateExpenseDto, @Req() req) : Promise<{message : string, data : ExpenseDocument}> {
        const expense = await this.expenseService.addExpense(body, req.user.userId);
        
        return {
            message : "Succesfully created an expense!",
            data : expense,
        };
    }
    
    @ApiOperation({ summary: 'Update an existing expense' })
    @ApiCreatedResponse({ 
        description: 'Successfully updated an expense.',
        type: UpdateExpenseDto
    })
    @ApiBadRequestResponse({ description: 'Invalid expense data' })
    @ApiNotFoundResponse({ description: 'Expense not found' })
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Param('id') expense_id : Types.ObjectId, @Req() req, @Body() body : UpdateExpenseDto) : Promise<{message : string, data : ExpenseDocument}> {
        const updatedExpense = await this.expenseService.updateExpense(body, req.user.userId, expense_id);
        
        return {
            message: 'Successfully updated an expense!',
            data: updatedExpense
        };
    }

    @ApiOperation({ summary: 'Delete an expense by ID' })
    @ApiOkResponse({ description: 'Expense deleted successfully' })
    @ApiNotFoundResponse({ description: 'Expense not found' })
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') expense_id : Types.ObjectId, @Req() req) : Promise<{message : string}> {
        await this.expenseService.deleteExpense(req.user.userId, expense_id);

        return {
            message: 'Successfully deleted an expense!',
        };
    }
}
