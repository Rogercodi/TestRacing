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
exports.VehiclePostController = void 0;
const userSchema_1 = require("../../models/userSchema");
const vehicleSchema_1 = require("../../models/vehicleSchema");
class VehiclePostController {
    constructor() { }
    newVehicle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = (req === null || req === void 0 ? void 0 : req.user)._id;
                let newVehicle = new vehicleSchema_1.Vehicle(req.body);
                yield newVehicle.save();
                let user = yield userSchema_1.User.findOne({ _id: id });
                user === null || user === void 0 ? void 0 : user.vehiculos.push(newVehicle._id);
                yield (user === null || user === void 0 ? void 0 : user.save());
                user = yield userSchema_1.User.findOne({ _id: id }).populate(["sessions", "vehiculos"]);
                return res.status(201).send({ message: "New vehicle stored!", user });
            }
            catch (e) {
                console.log(e);
                next(e);
            }
        });
    }
}
exports.VehiclePostController = VehiclePostController;
