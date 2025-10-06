const mongoose = require("mongoose");
mongoose.connect(
  `mongodb+srv://mostakinFabriBuzz:mostakin820336@fabribuzz.fqygycu.mongodb.net/?retryWrites=true&w=majority&appName=FabriBuzz`
);

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  age: String,
  email: String,
});

module.exports = mongoose.model("user", userSchema);
