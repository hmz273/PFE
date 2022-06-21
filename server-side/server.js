const express = require("express");
const connectDB = require("./db");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const PORT = 4000;
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};


connectDB();

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

// Routes
app.use("/api/auth", require("./Auth/route"));
app.use("/api/cars", require("./Cars/route"));
app.use("/api/booking", require("./Booking/route"));




const server = app.listen(PORT, () =>
  console.log(`Server Connected to port ${PORT}`)
);

process.on("unhandledRejection", (err) => {
  console.log(`An error occurred: ${err.message}`);
  server.close(() => process.exit(1));
});
