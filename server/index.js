const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoute = require("./Routes/userRoute");
const chatRoute = require("./Routes/chatRoute");
const messageRoute = require("./Routes/messageRoute");
const postRoute = require("./Routes/postRoute");
const uploadCloudinaryRoute = require("./Routes/upLoadCloudinaryRoute");

const app = express();
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
};
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
  })
)
app.use(cors(corsOptions));

//Initial Route
app.use("/api/v1/users", userRoute);
app.use("/api/v1/chats", chatRoute);
app.use("/api/v1/messages", messageRoute);
app.use("/api/v1/posts", postRoute);
app.use('/api/v1/images',uploadCloudinaryRoute);


app.get('/', (req, res) => {
    res.send("Chat app api is available!");
})

const port = process.env.PORT || 5000;
const uri = process.env.CONNECT_STRING;
app.listen(port, (req, res) => {
  console.log("Server running on port: " + port);
});

mongoose
  .connect(uri)
  .then(() => {
    console.log("MongoDB connection established!");
  })
  .catch((err) => console.log("MongoDB connection failed" + err.message));

 