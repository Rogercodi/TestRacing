"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth = {
    pass: (req, res, next) => {
        if (req.isAuthenticated()) {
            next();
        }
        else {
            res.status(404).send('not authorized');
        }
    }
};
exports.default = auth;
