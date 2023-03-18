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
exports.SetUpPostController = void 0;
const setupSchema_1 = require("../../models/setupSchema");
const userSchema_1 = require("../../models/userSchema");
const vehicleSchema_1 = require("../../models/vehicleSchema");
class SetUpPostController {
    constructor() { }
    addSetUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const setUp = new setupSchema_1.Setup(req.body);
                yield setUp.save();
                let vehicle = yield vehicleSchema_1.Vehicle.findById(req.body.vehiculo);
                vehicle === null || vehicle === void 0 ? void 0 : vehicle.configuraciones.push(setUp._id);
                yield (vehicle === null || vehicle === void 0 ? void 0 : vehicle.save());
                const user = yield userSchema_1.User.findOne({ _id: (req === null || req === void 0 ? void 0 : req.user)._id })
                    .populate(["sessions", "vehiculos"])
                    .populate({
                    path: "vehiculos",
                    populate: {
                        path: "configuraciones",
                    },
                });
                return res.status(201).send({ message: "Setup succesfully added", user });
            }
            catch (e) {
                console.log(e);
                next();
            }
        });
    }
}
exports.SetUpPostController = SetUpPostController;
