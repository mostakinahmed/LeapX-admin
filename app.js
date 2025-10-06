const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("./middlewares/verifyToken");

app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// app.get("/", (req, res) => {
//   res.render("home");
// });
app.get("/", verifyToken, (req, res) => {
  res.render("index");
});

app.get("/add-product", verifyToken, (req, res) => {
  res.render("addProduct");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  let { username, age, password, email } = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      const userData = await userModel.create({
        username,
        age,
        password: hash,
        email,
      });

      const token = jwt.sign({ email: email }, "secret");
      res.cookie("token", token);
      res.redirect("/");
    });
  });
});

app.get("/login", (req, res) => {
  res.render("login");
});



app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    // if (!user) return res.status(400).send("Invalid email or password.");
    if (!user) return res.redirect("/login");

    const match = await bcrypt.compare(password, user.password);
    // if (!match) return res.status(400).send("Invalid email or password.");
    if (!match) return res.redirect("/login");

    const token = jwt.sign({ email }, "secret", { expiresIn: "1h" });
    res.cookie("token", token, { httpOnly: true }); // secure in prod
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.redirect("/login");
  }
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/login");
});

app.listen(3000);
