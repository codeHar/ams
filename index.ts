import express from "express";
import cors from "cors";
import "dotenv/config";
import "./database";
import userRoute from "./routes/user.route";
import artistRoute from "./routes/artist.route";
import musicRoute from "./routes/music.route";

const app = express();
const PORT = process.env.PORT || 3306;

//middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

//routes
app.use("/api/user", userRoute);
app.use("/api/artist", artistRoute);
app.use("/api/music", musicRoute);

app.listen(PORT, () => {
  console.log(`Server running at localhost:${PORT}`);
});
