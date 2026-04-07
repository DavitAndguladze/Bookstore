import * as AddressRepository from "./address.repository";
import { AppError } from "../../shared/middleware/error.middleware";
import { Prisma } from "../../generated/prisma";

export const getAddress = async (userId: bigint) => {
  const addresses = await AddressRepository.findAddressByUserId(userId);
  return addresses.map((address) => ({
    ...address,
    id: address.id.toString(),
    userId: address.userId.toString(),
    countryId: address.countryId.toString(),
  }));
};

export const addAddress = async (
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
  try {
    const address = await AddressRepository.createAddress(userId, data);
    return {
      ...address,
      id: address.id.toString(),
      userId: address.userId.toString(),
      countryId: address.countryId.toString(),
    };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2003"
    ) {
      throw new AppError(400, "Country not found");
    }
    throw error;
  }
};

export const removeAddress = async (userId: bigint, id: bigint) => {
  const addresses = await AddressRepository.findAddressByUserId(userId);
  const owned = addresses.find((a) => a.id === id);
  if (!owned) throw new AppError(403, "You do not own this address");
  try {
    await AddressRepository.deleteAddress(id);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new AppError(404, "Address not found");
    }
    throw error;
  }
};
