const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const PORT = "8000";

dotenv.config();

const app = express();
//Need cors if frontend and backend are on different ports
app.use(cors());
app.use(express.json());

const examRoutes = require("./routes/exams");
const authRoutes = require("./routes/auth");
const institutionRoutes = require("./routes/institutions");
const acceptanceRoutes = require("./routes/acceptances");

// Mount the Routes from the Different Route Files
app.use("/api/auth", authRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/institutions", institutionRoutes);
app.use("/api/acceptances", acceptanceRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
