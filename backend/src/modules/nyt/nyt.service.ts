import env from "../../config/env";
import * as NytRepository from "./nyt.repository";
import { AppError } from "../../shared/middleware/error.middleware";

export const getAllLists = async () => {
    const lists = await NytRepository.findAllNytLists();
    return lists.map(list => ({
        ...list,
        id: list.id.toString()
    }))
}

export const getBooksOnList = async (listNameEncoded: string) => {
    const entries = await NytRepository.findAllBooksOnList(listNameEncoded);
    return entries.map( entry => ({
        ...entry,
        bookId: entry.bookId.toString(),
        nytListId: entry.nytListId.toString(),
        book: {
            ...entry.book,
            id: entry.book.id.toString()
        }
    }))
}

export const syncNytList = async (listNameEncoded: string): Promise<void> => {
    const response = await fetch(`https://api.nytimes.com/svc/books/v3/lists/current/${listNameEncoded}.json?api-key=${env.NYT_API_KEY}`);

    if(!response.ok) throw new AppError(502, "Failed to fetch NYT list");

    const data = await response.json();
    const {list_name, list_name_encoded, books } = data.results
    const nytList = await NytRepository.findOrCreateNytList(list_name, list_name_encoded);

    for (const book of books) {
        const mapping = await NytRepository.findBookByIsbn(book.primary_isbn13, book.primary_isbn10);
        if (!mapping) continue
        await NytRepository.upsertBookNytList(mapping.bookId, nytList.id, book.rank)
    }

}