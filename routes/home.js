import { Router } from "express";
import User from "../models/user.js";

const router = Router();

router.get("/", async (_, res) => {
	const users = await User.getAllUsers();
	res.json(users);
});

export default router;
