import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateArticleDto {
    @ApiProperty({ description: 'Article Title', example: 'How to Manage Your Money' })
    @IsString()
    @IsNotEmpty()
    title: string;
    
    @ApiProperty({ example: 'Note all yourr expenses', description: 'Article Content' })
    @IsString()
    @IsNotEmpty()
    content: string;
    
    @ApiProperty({ example: 'Andi Achmad Bryan', description: 'Article Author' })
    @IsString()
    @IsNotEmpty()
    author: string;
    
    @ApiProperty({ description: 'Article Date', example: '2024-04-27T00:00:00Z' })
    @IsDate()
    @IsNotEmpty()
    written_date: Date;
}
