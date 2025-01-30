import express from "express";
import morgan from "morgan";
const app = express();
app.use(express.json());
app.use(morgan("dev"));
const port = 3000;

app.get("/", (req, res) => {
  res.json({ msg: "Hello, world!" });
});
app.post("/", (req, res) => {
  const { name, age } = req.body;
  res.json({ message: `Hello, ${name}! You are ${age} years old.` });
});

app.listen(port, () => {
  console.log(`server running on port ${port}!`);
});
