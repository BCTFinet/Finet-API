import { Body, Controller, Post, Req } from '@nestjs/common';
import { QwenService } from './qwen.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Qwen')
@Controller('qwen')
export class QwenController {
    constructor(private readonly qwenService : QwenService){}

    @ApiOperation({ summary: 'Generate forecast using Qwen model' })
    @Post('forecast')
    async forecast(@Body() body){
        const forecast = await this.qwenService.generateText(body.goal, body.savings, body.target_date, body.extra_prompt);
        
        return {
            message : "Succesfully generated forecast!",
            forecast : forecast,
        };
    }
}