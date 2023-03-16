const { default: auth } = require("../config/auth");
import Vehicle from "../models/vehicleSchema";
import Session from "../models/sessionSchema";
import User from "../models/userSchema";
import Setup from "../models/setupSchema";

const Router = require("express").Router();

Router.post("/user/newsession", async (req, res) => {
  let id = req.user._id;
  let newSession = new Session(req.body);
  await newSession.save();
  let user = await User.findOne({ _id: id });
  user.sessions.push(newSession._id);
  await user.save();
  user = await User.findOne({ _id: id }).populate(["sessions", "vehiculos"]);
  res.send({ message: "New session stored!", user });
});

Router.post("/user/newvehicle", async (req, res) => {
  let id = req.user._id;
  let newVehicle = new Vehicle(req.body);
  await newVehicle.save();
  let user = await User.findOne({ _id: id });
  user.vehiculos.push(newVehicle._id);
  await user.save();
  user = await User.findOne({ _id: id }).populate(["sessions", "vehiculos"]);
  res.status(201).send({ message: "New vehicle stored!", user });
});

Router.delete("/user/deletesession/:id", async (req, res) => {
  const sessionID = req.params.id;
  const user = await User.findOne({ _id: req.user._id }).populate([
    "sessions",
    "vehiculos",
  ]);

  user.sessions = user.sessions.filter((item) => {
    let b = item.toString();
    return item._id.toString() !== sessionID;
  });
  await user.save();
  await Session.findOneAndDelete({ _id: sessionID });
  res.send({ message: "post recieved", user });
});

Router.put("/user/editsession/:id", async (req, res) => {
  const id = req.params.id;
  const { body } = req;
  console.log(id, body);
  const session = await Session.findByIdAndUpdate(id, body);
  await session.save();
  let user = await User.findOne({ _id: req.user._id }).populate([
    "sessions",
    "vehiculos",
  ]);
  res.status(201).send({ message: "Successfully updated", user });
});

Router.delete("/user/deletevehicle/:id", async (req, res) => {
  const vehicleID = req.params.id;
  const user = await User.findOne({ _id: req.user._id }).populate([
    "sessions",
    "vehiculos",
  ]);
  user.vehiculos = user.vehiculos.filter((item) => {
    return item._id.toString() !== vehicleID;
  });
  await user.save();
  await Vehicle.findOneAndDelete({ _id: vehicleID });
  res.send({ message: "post recieved", user });
});

Router.put("/user/editvehicle/:id", async (req, res) => {
  const id = req.params.id;
  const { body } = req;
  const vehicle = await Vehicle.findByIdAndUpdate(id, body);
  await vehicle.save();
  let user = await User.findOne({ _id: req.user._id }).populate([
    "sessions",
    "vehiculos",
  ]);
  res.status(201).send({ message: "Vehicle successfully updated", user });
});

Router.post("/user/myvehicles/setup", async (req, res) => {
  const setUp = new Setup(req.body);
  await setUp.save();
  let vehicle = await Vehicle.findById(req.body.vehiculo);
  vehicle.configuraciones.push(setUp._id);
  await vehicle.save();

  const user = await User.findOne({ _id: req.user._id })
    .populate(["sessions", "vehiculos"])
    .populate({
      path: "vehiculos",
      populate: {
        path: "configuraciones",
      },
    });
  res.status(201).send({ message: "Setup succesfully added", user });
});

Router.put("/user/myvehicles/editsetup", async (req, res) => {
  let updated = await Setup.findByIdAndUpdate(req.body.setupId, req.body);
  const user = await User.findOne({ _id: req.user._id })
    .populate(["sessions", "vehiculos"])
    .populate({
      path: "vehiculos",
      populate: {
        path: "configuraciones",
      },
    });
  res.status(201).send({ message: "Setup succesfully updated", user });
});

Router.delete('/user/myvehicles/deletesetup/:referencia', async (req, res) => {
  let ref = req.params.referencia;
  console.log(ref);
  await Setup.findOneAndDelete({ referencia: ref});
  const user = await User.findOne({ _id: req.user._id })
  .populate(["sessions", "vehiculos"])
  .populate({
    path: "vehiculos",
    populate: {
      path: "configuraciones",
    },
  });
  res.status(201).send({message: 'setup removed!', user})
})

export default Router;
