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

    @IsNumber()
    publishDate: number = Date.now()

    @IsNumber()
    rating: number = 0

    @IsBoolean()
    @IsOptional()
    isBookmarked?: boolean | null
}