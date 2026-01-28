import dayjs from "dayjs";
import type { BookDto } from "./books.dto";
import type { Book } from "./components/BookItem/BookItem";

export const bookDtoToBook = (dto: BookDto): Book => ({
    ...dto,
    pages: dto.pages === undefined || dto.pages === null || dto.pages === 0 ? "" : dto.pages.toString(),
    language: dto.language ?? "",
    rating: dto.rating?.toString() ?? ""
    // publishDate: dayjs(dto.publishDate).format("DD.MM.YYYY")
})