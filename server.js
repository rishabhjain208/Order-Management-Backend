// require("dotenv").config();
// const http = require("http");
// const { Server } = require("socket.io");

// const app = require("./src/app");
// const connectDB = require("./src/config/db");

// connectDB();

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: { origin: "*" },
// });

// // make io accessible in controllers
// app.use((req, res, next) => {
//   req.io = io;
//   next();
// });

// io.on("connection", (socket) => {
//   console.log("Client connected:", socket.id);
// });

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () =>
//   console.log(`Server running on port ${PORT}`)
// );
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");

const app = require("./src/app");
const connectDB = require("./src/config/db");

connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "https://order-management-frontend-beta.vercel.app",
      "https://order-management-backend-if9a.onrender.com",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// make io accessible in controllers
app.use((req, res, next) => {
  req.io = io;
  next();
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
