from pydantic import BaseModel, Field
from typing import Optional, List
import time

class Book(BaseModel):
    id: str = Field(default="", min_length=3)
    title: str = Field(default="", min_length=3)
    author: str = Field(default="", min_length=3)
    publisher: Optional[str] = Field(default="", min_length=1)
    language: str = Field(default="", min_length=1)
    translations: List[str] = []
    publishDate: int = Field(default_factory=lambda: int(time.time() * 1000))
    rating: int = 0

class BookDto(Book):
    isBookmarked: Optional[bool] = None



class SearchDto(BaseModel):
    q: Optional[str] = None
    title: Optional[str] = None
    author: Optional[str] = None
    publisher: Optional[str] = None
    language: Optional[str] = None

class AuthDto(BaseModel):
    username: str
    password: str