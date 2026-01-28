import { IsNotEmpty, IsNotEmptyObject, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class GeneralStatsDto {

    @IsNumber()
    total_books: number = 0

    @IsNumber()
    total_authors: number = 0
    @IsNumber()
    total_subjects: number = 0
    @IsNumber()
    total_languages: number = 0

    @IsNumber()
    @IsOptional()
    average_rating?: number
}

export class SubjectStatDto {
    @IsString()
    @MinLength(1)
    name: string = ""

    @IsNumber()
    book_count: number = 0
}

export class SubjectRatingDto{
    @IsString()
    @IsNotEmpty()
    name: string = ""

    @IsNumber()
    average_rating: number = 0.0
}

class LanguageStatDto {
    @IsString()
    @IsNotEmpty()
    language_name: string = ""
    @IsNumber()
    total_books: number = 0
    @IsNumber()
    translated_books: number = 0
    @IsNumber()
    translation_percentage: number = 0.0
}

export class FavoriteWorkDto{
    @IsString()
    @IsNotEmpty()
    title: string = ""
    @IsNumber()
    favorite_count: number = 0
}

export class StatisticsDto {
    @IsNotEmptyObject()
    general_stats: GeneralStatsDto = {
        total_books: 0,
        total_authors: 0,
        total_subjects: 0,
        total_languages: 0,
        average_rating: 0
    }

    @IsNotEmpty()
    top_subjects_by_books: SubjectStatDto[] = []

    @IsNotEmpty()
    top_subjects_by_rating: SubjectRatingDto[] = []

    @IsNotEmpty()
    language_stats: LanguageStatDto[] = []
}
