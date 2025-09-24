import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ExpenseModule } from './expense/expense.module';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { WalletModule } from './wallet/wallet.module';
import { ArticleModule } from './article/article.module';
import configuration from 'config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
              isGlobal: true,
              // load: [configuration],
            }),
    MongooseModule.forRoot('mongodb://localhost:27017/finnet'),
    AuthModule,
    ExpenseModule,
    CategoryModule,
    UserModule,
    WalletModule,
    ArticleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
