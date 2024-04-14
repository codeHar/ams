import express from "express";
import "dotenv/config";
import "./database";
import userRoute from "./routes/user.route";

const app = express();
const PORT = process.env.PORT || 3306;

//middlewares
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

//routes
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server running at localhost:${PORT}`);
});
