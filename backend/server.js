const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("DevCollab API is running");
});

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        orogin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});

app.set("io", io);

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
