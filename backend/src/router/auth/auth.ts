import { NextFunction, Request, Response } from "express";

const auth: {
    pass: (req: Request, res: Response, next: NextFunction) => void
} = {
    pass: (req, res, next) => {
        if (req.isAuthenticated()) {
            next()
        } else {
            res.status(404).send('not authorized')
        }
    }
};



export default auth;
