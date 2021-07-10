import express from "express";

import auth from "./v1/auth";


const router = express.Router();

router.use("/api/auth", auth);

export default router;
