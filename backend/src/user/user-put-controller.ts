
import express, { Application, json, Router, urlencoded } from "express";
import { UserRepository } from "./getuser";
import { UpdateSessionService } from "./put-user-service";


Router().put("/user/editsession/:id", async (req, res) => {

    const id = req.params.id;
    const { body } = req;

    const repo = new UserRepository();
    const service = new UpdateSessionService(repo);

    const user = await service.run(id, (req.user as any)._id, body);
    if (user) {
        res.status(201).send({ message: "Successfully updated", user });
    } else {
        res.status(404).send({ error: "User not found" });
    }
});