import { prisma } from "../../config/db";

export const findAllFeatured = async () => {
    return prisma.homepageFeature.findMany();
}

export const createFeatured = async (bookId: bigint, section: string, position: number) => {
    return prisma.homepageFeature.create({
        data: {bookId, section, position}
    })
}

export const deleteFeature = async (id: bigint) => {
    return prisma.homepageFeature.delete({
        where: {id}
    })
}