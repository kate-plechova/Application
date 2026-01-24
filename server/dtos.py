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

class AuthDto(BaseModel):
    username: str
    password: str

    password: str
