import { Request, Response, NextFunction } from "express";
import * as NytService from "./nyt.service";

export const getAllListsHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const list = await NytService.getAllLists();
        res.status(200).json(list);
    } catch(error) {
        next(error)
    }
}

export const getBooksOnListHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { listNameEncoded } = req.params;
        const entry = await NytService.getBooksOnList(listNameEncoded as string);
        res.status(200).json(entry);
    } catch(error) {
        next(error);
    }
}