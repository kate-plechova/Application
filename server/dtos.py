from pydantic import BaseModel, Field
from typing import Optional, List
import time

class Book(BaseModel):
    '''
    Represents the book entity
    '''
    id: str = Field(default="", min_length=1) # Changed min_length to 1
    title: str = Field(default="", min_length=1) # Changed min_length to 1
    author: str = Field(default="", min_length=1) # Changed min_length to 1
    publisher: Optional[str] = Field(default="", min_length=1)
    language: Optional[str] = Field(default="", min_length=1)
    pages: Optional[float] = Field(default = 0)
    translations: List[str] = []
    # publishDate: int = Field(default_factory=lambda: int(time.time() * 1000))
    rating: Optional[float] = Field(default=None)

class BookDto(Book):
    '''
    Represents the book's dto

    Used for search queries
    '''
    isBookmarked: Optional[bool] = None



class SearchDto(BaseModel):
    '''
    Represents the search query dto
    '''
    q: Optional[str] = None
    title: Optional[str] = None
    author: Optional[str] = None
    publisher: Optional[str] = None
    language: Optional[str] = None
    subject: Optional[str] = None

class AuthDto(BaseModel):
    '''
    Represents the auth dto
    '''
    username: str
    password: str


class GeneralStatsDto(BaseModel):
    total_books: int = Field(default=0)
    total_authors: int = Field(default=0)
    total_publishers: int = Field(default=0)
    total_subjects: int = Field(default=0)
    total_languages: int = Field(default=0)
    average_rating: Optional[float] = Field(default=None)

class SubjectStatDto(BaseModel):
    name: str = Field(default="", min_length=1)
    book_count: int = Field(default=0)

class SubjectRatingDto(BaseModel):
    name: str = Field(default="", min_length=1)
    average_rating: float = Field(default=0)

class LanguageStatDto(BaseModel):
    language_name: str = Field(default="", min_length=1)
    total_books: int = Field(default=0)
    total_authors: int = Field(default=0)
    translated_books: int = Field(default=0)
    translation_percentage: float = Field(default=0)

class FavoriteWorkDto(BaseModel):
    title: str = Field(default="", min_length=1)
    author: str = Field(default="", min_length=1)
    favorite_count: int = Field(default=0)

class StatisticsDto(BaseModel):
    general_stats: GeneralStatsDto = Field(default_factory=GeneralStatsDto)
    top_subjects_by_books: List[SubjectStatDto] = Field(default_factory=list)
    top_subjects_by_rating: List[SubjectRatingDto] = Field(default_factory=list)
    language_stats: List[LanguageStatDto] = Field(default_factory=list)
    top_works_by_favorites: List[FavoriteWorkDto] = Field(default_factory=list)