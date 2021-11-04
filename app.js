require("dotenv").config();

// async errors

const express = require("express");
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");
const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");

const app = express();

// middleware

app.use(express.json());

// routes

app.get("/", (req, res) => {
  res.send('<h1>Store API</h1> <a href="/api/v1/products">Products route</a>');
});

app.use("/api/v1/products", productsRouter);

// products route
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // connect DB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listning on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
