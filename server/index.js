import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

// Global variables
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/v1", routes);

app.get("/", (req, res) => res.send("Working!"))

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));