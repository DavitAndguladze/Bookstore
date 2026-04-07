import { prisma } from "../../config/db";

export const findAddressByUserId = async (userId: bigint) => {
  return prisma.address.findMany({
    where: { userId },
  });
};

export const createAddress = async (
  userId: bigint,
  data: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    countryId: bigint;
    isDefault: boolean;
  },
) => {
  return prisma.address.create({
    data: { userId, ...data },
  });
};

export const deleteAddress = async (id: bigint) => {
  return prisma.address.delete({
    where: { id },
  });
};
