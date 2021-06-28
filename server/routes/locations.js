import express from "express";
import request from "request";

const router = express.Router();

router.get("/states", (req, res) => {
    request(
        `https://cdn-api.co-vin.in/api/v2/admin/location/states`,
        (error, response, body) => {
            if (!error && response.statusCode == 200) {
                res.status(200).json(JSON.parse(body))
            }
            else {
                res.status(200).json({ available: false, message: "Error with CoWin servers" })
            }
        }
    )
})

router.get("/districts/:state_id", (req, res) => {
    const state_id = req.params.state_id;
    request(
        `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${state_id}`,
        (error, response, body) => {
            if (!error && response.statusCode == 200) {
                res.status(200).json(JSON.parse(body))
            }
            else {
                res.status(200).json({ available: false, message: "Error with CoWin servers" })
            }
        }
    )
})

export default router;