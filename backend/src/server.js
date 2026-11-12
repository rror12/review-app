require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { init } = require("./config/postgres");
const connectMongo = require("./config/mongo");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", require("./routes/users"));
app.use("/api/reviews", require("./routes/reviews"));

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await init();
    console.log("Postgres ready");
    await connectMongo();
    console.log("Mongo ready");
    app.listen(PORT, () => console.log(`Backend on ${PORT}`));
  } catch (err) {
    console.error("Startup failed:", err.message);
    process.exit(1);
  }
})();
