import { Request, Response, NextFunction } from "express";
import * as ReviewsService from "./reviews.service";

export const createReviewHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const bookId = BigInt(req.params.id as string);
    const userId = BigInt(req.user!.userId);
    const { rating, comment } = req.body;

    const reviews = await ReviewsService.createReview(
      userId,
      bookId,
      rating,
      comment,
    );
    res.status(201).json(reviews);
  } catch (error) {
    next(error);
  }
};

export const getReviewsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const bookId = BigInt(req.params.id as string);
    const review = await ReviewsService.getReviewsByBookId(bookId);
    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
};
