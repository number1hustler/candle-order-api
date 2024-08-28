import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import http from "http";
import cors from "cors";

// routes
import fragranceRoutes from "./routes/fragrance-route.js";

//repos
import { fragranceRepository } from "./schema/fragrance.js";

var app = express();

// Cors
app.use(
  // Real Domain goes here
  cors({
    origin: "http://localhost:8301",
  })
);

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

// Index Repos -- this step is needed to be able to query the fields in Redis-Om
// Indexs will only run if there is no index already created or the schema has been updated
fragranceRepository.createIndex();

// Set port and create HTTP server
const port = process.env.PORT || 3000;
app.set("port", port);
const server = http.createServer(app);

// Routes
app.use("/fragrance", fragranceRoutes);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

// Helper function for HTTP server "error" event
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// Helper function for HTTP server "listening" event
function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("Listening on " + bind);
}
