import express from "express";
import request from "request";
import { findAvailability } from "../utils.js";

const router = express.Router();

router.get("/pin", (req, res) => {
    const pincode = req.query.pincode;
    const date = req.query.date;
    const filters = {};
    if (req.query.age) filters["age"] = req.query.age;
    if (req.query.cost) filters["cost"] = req.query.cost;
    if (req.query.vaccine) filters["vaccine"] = req.query.vaccine;

    const interval_id = setInterval(() => {
        request(
            `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pincode}&date=${date}`,
            (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    const is_available = findAvailability(JSON.parse(body), filters);
                    if (is_available) {
                        clearInterval(interval_id);
                        res.status(200).json({ available: true });
                    }
                }
                else {
                    clearInterval(interval_id);
                    res.status(200).json({ available: false, message: "Error with CoWin servers" })
                }
            }
        )
    }, 5000)
})

router.get("/district", (req, res) => {
    const district_id = req.query.district_id;
    const date = req.query.date;
    const filters = {};
    if (req.query.age) filters["age"] = req.query.age;
    if (req.query.cost) filters["cost"] = req.query.cost;
    if (req.query.vaccine) filters["vaccine"] = req.query.vaccine;

    const interval_id = setInterval(() => {
        request(
            `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${district_id}&date=${date}`,
            (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    const is_available = findAvailability(JSON.parse(body));
                    if (is_available) {
                        clearInterval(interval_id);
                        res.status(200).json({ available: true });
                    }
                }
                else {
                    clearInterval(interval_id);
                    res.status(200).json({ available: false, message: "Error with CoWin servers" })
                }
            }
        )
    }, 5000)
})

export default router;