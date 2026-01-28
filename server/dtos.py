from pydantic import BaseModel, Field
from typing import Optional, List
import time

class Book(BaseModel):
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
    isBookmarked: Optional[bool] = None



class SearchDto(BaseModel):
    q: Optional[str] = None
    title: Optional[str] = None
    author: Optional[str] = None
    publisher: Optional[str] = None
    language: Optional[str] = None
    subject: Optional[str] = None

class AuthDto(BaseModel):
    username: str
    password: str

    password: str

# --- New DTOs for Statistics ---

class GeneralStatsDto(BaseModel):
    total_books: int
    total_authors: int
    total_subjects: int
    total_languages: int
    average_rating: Optional[float]

class SubjectStatDto(BaseModel):
    name: str
    book_count: int

class SubjectRatingDto(BaseModel):
    name: str
    average_rating: float

class LanguageStatDto(BaseModel):
    language_name: str
    total_books: int
    translated_books: int
    translation_percentage: float

class FavoriteWorkDto(BaseModel):
    title: str
    favorite_count: int

class StatisticsDto(BaseModel):
    general_stats: GeneralStatsDto
    top_subjects_by_books: List[SubjectStatDto]
    top_subjects_by_rating: List[SubjectRatingDto]
    language_stats: List[LanguageStatDto]
    top_works_by_favorites: List[FavoriteWorkDto]
