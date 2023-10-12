//gerekli import işlemleri

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/database.js"); // db
const Auth = require("./routes/auth.js");
const Post = require("./routes/post.js");

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use("/", Auth);
app.use("/", Post);
//port'un ayarı
const PORT = process.env.PORT || 5000;
//db bağlantı ayarı
db();

app.get("/", (req, res) => {
  res.json({ message: "deneme deneme" });
});
//Port ayarı
app.listen(PORT, () => {
  console.log("Server is running at 5000");
});
