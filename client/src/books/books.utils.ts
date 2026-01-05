import { v4 } from "uuid";
import type { BookDto } from "./books.dto";
import { faker } from "@faker-js/faker"

const languages = ["en", "ru", "he"]

export const getRandomBookDto = (): BookDto => ({
    id: v4(),
    title: faker.book.title(),
    author: faker.book.author(),
    publisher: faker.book.publisher(),
    translations: languages,
    publishDate: faker.date.past().getTime(),
    rating: faker.number.int({ min: 1, max: 5 })
})