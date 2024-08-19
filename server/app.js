const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes");
const { connectToDatabase } = require("./models/index");
const { validateApiKeyMiddleware } = require("./middleware/apiKeyMiddleware");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

const corsOptions = {
  origin: "http://localhost:3001",
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(
      "Failed to initialize the app due to database connection issues."
    );
    process.exit(1);
  }
})();

app.use("/api", validateApiKeyMiddleware, router);
