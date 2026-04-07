import { Request, Response, NextFunction } from "express";
import * as AddressService from "./address.service";

export const getAddressHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const address = await AddressService.getAddress(req.user!.userId);
    res.status(200).json(address);
  } catch (error) {
    next(error);
  }
};

export const addAddressHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const address = await AddressService.addAddress(req.user!.userId, {
      ...req.body,
      countryId: BigInt(req.body.countryId),
    });
    res.status(201).json(address);
  } catch (error) {
    next(error);
  }
};

export const removeAddressHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await AddressService.removeAddress(
      req.user!.userId,
      BigInt(req.params.id as string),
    );
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
