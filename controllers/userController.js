const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

{
  /*  
  @desc register info
  @routes post /api/register
  @access public
  */
}

const registermethod = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mendatory!");
  }

  const availableuser = await User.findOne({ email });
  if (availableuser) {
    res.status(400);
    throw new Error("User already registered!");
  }

  //   //Hash password
  const hashedpassword = await bcrypt.hash(password, 10);
  console.log("Hashed password", hashedpassword);
  const user = await User.create({
    username,
    email,
    password: hashedpassword,
  });
  console.log(`user created ${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("user data us not valid");
  }
  res.json({ message: "user registered" });
});

{
  /*  
    @desc login info
    @routes post /api/login
    @access public
    */
}

const loginmethod = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields mandatory!");
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accesstoken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    res.status(200).json({ accesstoken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
  res.json({ message: "user login" });
});

{
  /*  
    @desc current user info
    @routes post /api/login
    @access private
    */
}

const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registermethod, loginmethod, currentUser };
