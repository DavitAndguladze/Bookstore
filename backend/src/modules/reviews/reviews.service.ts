import { AppError } from "../../shared/middleware/error.middleware";
import * as ReviewsRepository from "./reviews.repository";
import { Prisma } from "../../generated/prisma";
export const createReview = async (
  userId: bigint,
  bookId: bigint,
  rating: number,
  comment: string,
) => {
  if (rating < 1 || rating > 5) {
    throw new AppError(400, "Rating must be between 1 and 5");
  }
  try {
    const review = await ReviewsRepository.createReview(
      userId,
      bookId,
      rating,
      comment,
    );
    return {
      ...review,
      id: review.id.toString(),
      userId: review.userId.toString(),
      bookId: review.bookId.toString(),
    };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new AppError(400, "You have already reviewed this book");
    }
    throw error;
  }
};

export const getReviewsByBookId = async (bookId: bigint) => {
  const review = await ReviewsRepository.findReviewsByBookId(bookId);
  return review.map((list) => ({
    ...list,
    id: list.id.toString(),
    userId: list.userId.toString(),
    bookId: list.bookId.toString(),
  }));
};
