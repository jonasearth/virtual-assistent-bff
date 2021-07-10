import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "asdasd" });
});

export default router;
