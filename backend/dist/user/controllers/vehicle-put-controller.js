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
exports.VehiclePutController = void 0;
const userSchema_1 = require("../../models/userSchema");
const vehicleSchema_1 = require("../../models/vehicleSchema");
class VehiclePutController {
    constructor() { }
    EditVehicle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const { body } = req;
                const vehicle = yield vehicleSchema_1.Vehicle.findByIdAndUpdate(id, body);
                yield (vehicle === null || vehicle === void 0 ? void 0 : vehicle.save());
                let user = yield userSchema_1.User.findOne({ _id: (req === null || req === void 0 ? void 0 : req.user)._id }).populate([
                    "sessions",
                    "vehiculos",
                ]);
                return res.status(201).send({ message: "Vehicle successfully updated", user });
            }
            catch (e) {
                console.log(e);
                next();
            }
        });
    }
}
exports.VehiclePutController = VehiclePutController;
