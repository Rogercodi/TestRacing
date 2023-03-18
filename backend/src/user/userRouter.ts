import express from "express";
import { SessionDeleteController } from "./controllers/session-delete-controller";
import { SessionPostController } from "./controllers/session-post-controller";
import { SessionPutController } from "./controllers/session-put-controller";
import { SetUpDeleteController } from "./controllers/set-up-delete-controller";
import { SetUpPutController } from "./controllers/set-up-put-controller";
import { SetUpPostController } from "./controllers/setup-post-controller";
import { VehicleDeleteController } from "./controllers/vehicle-delete-controller";
import { VehiclePostController } from "./controllers/vehicle-post-controller";
import { VehiclePutController } from "./controllers/vehicle-put-controller";

const userRouter = express.Router();

const editSessionController = new SessionPutController();
userRouter.put("/user/editsession/:id", editSessionController.EditSession.bind(editSessionController));

const newSessionController = new SessionPostController();
userRouter.post("/user/newsession", newSessionController.newSession.bind(newSessionController));

const newVehicleController = new VehiclePostController();
userRouter.post("/user/newvehicle", newVehicleController.newVehicle.bind(newVehicleController));

const deleteSessionController = new SessionDeleteController();
userRouter.delete("/user/deletesession/:id", deleteSessionController.deleteSession.bind(deleteSessionController));

const deleteVehicleControler = new VehicleDeleteController();
userRouter.delete("/user/deletevehicle/:id", deleteVehicleControler.deleteVehicle.bind(deleteVehicleControler));

const editVehicleController = new VehiclePutController();
userRouter.put("/user/editvehicle/:id", editVehicleController.EditVehicle.bind(editVehicleController));

const addSetUpController = new SetUpPostController();
userRouter.post("/user/myvehicles/setup", addSetUpController.addSetUp.bind(editSessionController));

const editSetUpController = new SetUpPutController();
userRouter.put("/user/myvehicles/editsetup", editSetUpController.editSetUp.bind(editSetUpController));

const deleteSetUpController = new SetUpDeleteController();
userRouter.delete("/user/myvehicles/deletesetup/:referencia", deleteSetUpController.deleteSetUp.bind(deleteSetUpController));

export default userRouter;
