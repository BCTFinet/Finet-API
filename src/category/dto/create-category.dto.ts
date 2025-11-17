import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
    @ApiProperty({ description: 'Category Name', example: 'Transportation' })
    @IsString()
    @IsNotEmpty()
    name: string;
}
