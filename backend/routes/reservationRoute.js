import express from "express";
import {reservation} from "../controller/reservation.js";

const router = express.Router();

router.post("/send", reservation);

export default router;