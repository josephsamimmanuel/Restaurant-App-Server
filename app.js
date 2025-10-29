const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");

const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "https://restaurant-app-chh7.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Origin"],
}));

app.use(cookieParser());

app.use(express.json());

const userRouter = require("./routes/userRoute");
const foodItemsRouter = require("./routes/foodItemsRoute");
const masalaItemsRouter = require("./routes/masalaItemsRoute");

app.use("/api/users", userRouter);
app.use("/api/foodItems", foodItemsRouter);
app.use("/api/masalaItems", masalaItemsRouter);

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
}).catch((err) => {
    console.log(err);
});