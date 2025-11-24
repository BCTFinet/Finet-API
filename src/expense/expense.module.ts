import { Module } from '@nestjs/common';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';
import { Expense, ExpenseSchema } from '../schema/expense.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { WalletModule } from '../wallet/wallet.module';

@Module({
    imports: [MongooseModule.forFeature(
            [{name : Expense.name, schema : ExpenseSchema}]
        ),
        WalletModule,
    ],
    providers : [ExpenseService],
    controllers : [ExpenseController]
})

export class ExpenseModule {}
