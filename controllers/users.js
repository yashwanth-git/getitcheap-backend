const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userModel = require("../models/usersModel");

const signin = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  try {
    const existingUser = await userModel.findOne({ email });
    console.log(existingUser);
    //If user already exists
    if (!existingUser)
      return res.status(404).json({ message: "User does not exist." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (err) {
    res.status(500).json({ message: "Somethin went wrong." });
  }
};

const signup = async (req, res) => {
  const { email, password, firstName, lastName, confirmPassword } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User already exists." });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password does not match" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await userModel.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, "TEST", {
      expiresIn: "1h",
    });
    res.status(200).json({ result, token });
  } catch (err) {
    res.status(500).json({ message: "Somethin went wrong." });
  }
};

module.exports = { signup, signin };
