import express from "express";
import morgan from "morgan";
const app = express();
app.use(express.json());
app.use(morgan("dev"));

console.log(process.env.PORT);
// Logging middleware for development environments
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.get("/", (req, res) => {
  res.json({ msg: "Hello, world!" });
});
app.get("/test", (req, res) => {
  res.json({ msg: "This is a test endpoint" }); // This will be logged in the console
});

app.post("/", (req, res) => {
  const { name, age } = req.body;
  res.json({ message: `Hello, ${name}! You are ${age} years old.` });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server running on port ${port}!`);
});
