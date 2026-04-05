import { prisma } from "../../config/db";

export const findOrCreateNytList = async (listName: string, listNameEncoded: string) => {
    // Upsert first uses the where clause to check if the list already exists.
    // If it exists, nothing will be updated — update only runs when the record is found.
    // If nothing exists for listNameEncoded, it goes to create and inserts a new record.
    return prisma.nytList.upsert({
        where: {listNameEncoded},
        update: {}, // nothing to update if the list already exists
        create: { listName, listNameEncoded}
    })
}

export const findBookByIsbn = async (isbn13: string, isbn10: string) => {
    return prisma.book.findFirst({
        where: {
            OR: [
                {isbn13},
                {isbn10},
            ]
        }
    })
}

export const upsertBookNytList = async (bookId: bigint, nytListId: bigint, rank: number) => {
    return prisma.bookNytList.upsert({
        where: {bookId_nytListId: {bookId, nytListId}},
        update: {rank},
        create: {bookId, nytListId, rank},
    })
}

export const findAllNytLists = async () => {
    return prisma.nytList.findMany();
}

export const findAllBooksOnList = async (listNameEncoded: string) => {
    return prisma.bookNytList.findMany({
        where: {
            nytList: { listNameEncoded }
        },
        include: { book: true }
    });
}