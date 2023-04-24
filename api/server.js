import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
// import gigRoute from "./routes/gig.route.js";
// import {conversationsRoute} from "./routes/conversation.route.js";
// import {messagesRoute} from "./routes/message.route.js";
// import {ordersRoute} from "./routes/order.route.js";
// import {reviewsRoute} from "./routes/review.route.js";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();


const connect = async () =>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("db is connected");
    } catch (error) {
        console.log(error);
    }
};

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
// app.use("/api/gigs", gigRoute);
// app.use("/api/conversations", conversationsRoute);
// app.use("/api/messages", messagesRoute);
// app.use("/api/orders", ordersRoute);
// app.use("api/reviews", reviewsRoute);
app.use((err,req,res,next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";

    return res.status(errorStatus).send(errorMessage);
});
    
    app.listen(8800, () => {
    connect()
    console.log("backend server is running");
});