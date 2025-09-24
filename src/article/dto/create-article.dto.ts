import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateArticleDto {
    @IsString()
    @IsNotEmpty()
    title: string;
    
    @IsString()
    @IsNotEmpty()
    content: string;
    
    @IsString()
    @IsNotEmpty()
    author: string;
    
    @IsDate()
    @IsNotEmpty()
    written_date: Date;
}
