import { Router } from "express";
import User from "../models/user.js";

const router = Router();

router.get("/", async (_, res) => {
	const users = await User.getAllUsers();

	if (users.length === 0) {
		res.status(404).json({ message: "Users not found" });
	} else {
		res.status(200).json(users);
	}
});

export default router;
