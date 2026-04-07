import { prisma } from "../../config/db";

export const createReview = async (userId: bigint, bookId: bigint, rating: number, comment: string) => {
    return prisma.review.create({
        data: {userId, bookId, rating, comment }
    })
}

export const findReviewsByBookId = async (bookId: bigint) => {
    return prisma.review.findMany({
        where: { bookId }
    })
}