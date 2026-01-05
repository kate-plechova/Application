import dayjs from "dayjs";
import type { BookDto } from "./books.dto";
import type { Book } from "./components/BookItem/BookItem";

export const bookDtoToBook = (dto: BookDto): Book => ({
    ...dto,
    publishDate: dayjs(dto.publishDate).format("DD.MM.YYYY")
})