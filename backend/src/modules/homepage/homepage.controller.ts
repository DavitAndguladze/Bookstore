import { Request, Response, NextFunction } from "express";
import * as HomepageService from "./homepage.service";

export const getFeaturedHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const feature = await HomepageService.getFeatured();
    res.status(200).json(feature);
  } catch (error) {
    next(error);
  }
};

export const addFeatureHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { bookId, section, position } = req.body;
    const feature = await HomepageService.addFeature(
      BigInt(bookId),
      section,
      position,
    );
    res.status(201).json(feature);
  } catch (error) {
    next(error);
  }
};

export const removeFeatureHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = BigInt(req.params.id as string);
    await HomepageService.removeFeature(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
