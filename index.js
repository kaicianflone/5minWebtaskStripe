import { express } from "express";
import { path } from "path";

const app = express();

// comma separated
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});
