import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRouter from "./routes/auth.js";
import homeRouter from "./routes/home.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json({ extended: true }));
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);

app.use("/", homeRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => {
	console.log(`Server is running on port http://localhost:${PORT}`);
});
