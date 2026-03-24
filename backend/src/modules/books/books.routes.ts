import express from "express";

const bookRouter = express.Router();

// Router for Books
bookRouter.get("/", (req, res)=> {
    res.send("Books router");
});

export default bookRouter;