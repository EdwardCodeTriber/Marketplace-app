import "dotenv/config"
import express from "express"
import cors from "cors"
import connectDB from "./config/database.js";
import router from "./routes/api.js";
import bodyParser from "body-parser"

//App start
const app = express();
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(cors());
// App use imported router with endpoints into an active server/api
app.use("/api", router)
app.use(bodyParser.json()); // Parses incoming JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parses URL-encoded data

// MongoDB connection with the .env file
connectDB()

// PORT Start
app.listen(PORT, ()=> console.log(`Server running ${PORT}`))