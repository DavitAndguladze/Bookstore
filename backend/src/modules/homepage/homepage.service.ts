import * as HomepageRepository from "./homepage.repository";
import { AppError } from "../../shared/middleware/error.middleware";
import { Prisma } from "../../generated/prisma";

export const getFeatured = async () => {
  const featured = await HomepageRepository.findAllFeatured();
  return featured.map((item) => ({
    ...item,
    id: item.id.toString(),
    bookId: item.bookId.toString(),
  }));
};

export const addFeature = async (bookId: bigint, section: string, position: number) => {
    try {
        const feature = await HomepageRepository.createFeatured(bookId, section, position);

    return {
        ...feature,
        id: feature.id.toString(),
        bookId: feature.bookId.toString()
    }
    } catch(error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003') {
            throw new AppError(400, 'Book not found');
        }
    }
}

export const removeFeature = async (id: bigint) => {
    try {
            await HomepageRepository.deleteFeature(id);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new AppError(404, 'Feature not found');
            }
            throw error;
        }
}