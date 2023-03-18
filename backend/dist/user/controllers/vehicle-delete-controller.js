"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleDeleteController = void 0;
const userSchema_1 = require("../../models/userSchema");
const vehicleSchema_1 = require("../../models/vehicleSchema");
class VehicleDeleteController {
    constructor() { }
    deleteVehicle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vehicleID = req.params.id;
                const user = yield userSchema_1.User.findOne({ _id: (req === null || req === void 0 ? void 0 : req.user)._id }).populate([
                    "sessions",
                    "vehiculos",
                ]);
                if (!user) {
                    return res.status(404).send({ error: "User not found" });
                }
                user.vehiculos = user.vehiculos.filter((item) => {
                    return item._id.toString() !== vehicleID;
                });
                yield user.save();
                yield vehicleSchema_1.Vehicle.findOneAndDelete({ _id: vehicleID });
                return res.status(200).send({ message: "post recieved", user });
            }
            catch (e) {
                console.log(e);
                next();
            }
        });
    }
}
exports.VehicleDeleteController = VehicleDeleteController;
