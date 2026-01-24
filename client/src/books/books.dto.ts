import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator'

export class BookDto {
    @IsString()
    @MinLength(3)
    id: string = ""

    @IsString()
    @MinLength(3)
    title: string = ""

    @IsString()
    @MinLength(3)
    author: string = ""

    @IsArray()
    @IsString({ each: true }) 
    @IsNotEmpty({ each: true })
    translations: string[] = []

    @IsString()
    @MinLength(1)
    publisher: string = ""

    // @IsNumber()
    // publishDate: number = Date.now()

    @IsString()
    @IsOptional()
    language?: string

    @IsNumber()
    @IsOptional()
    pages?: number

    @IsNumber()
    @IsOptional()
    rating?: number

    @IsBoolean()
    @IsOptional()
    isBookmarked?: boolean
}