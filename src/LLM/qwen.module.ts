import { Module } from '@nestjs/common';
import { QwenService } from './qwen.service';
import { ConfigModule } from '@nestjs/config';
import { QwenController } from './qwen.controller';

@Module({
  imports: [ConfigModule],
  providers: [QwenService],
  controllers: [QwenController],
})
export class QwenModule {}