import { Router } from "express";
import User from "../models/user.js";
const router = Router();

router.post("/", async (req, res) => {
	const user = new User(req.body.name, req.body.password);

	await user.save();

	if (req.body.length) {
		res.sendStatus(200);
	} else {
		res.status(400).json({ message: "Invalid data" });
	}
});

export default router;
