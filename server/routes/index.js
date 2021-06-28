import express from "express";
import availability from "./availability.js";
import locations from "./locations.js";

const router = express.Router();

router.use("/availability", availability);
router.use("/locations", locations);

export default router;