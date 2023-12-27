import User from "../models/userSchema.js";
// ####################################### Register User ###########################################
export const AddUser = async (req, res) => {
  try {
    const { name, email, mobile, gender, nationality, address, message } =
      req.body;

    // Check if the user with the given email already exists
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).json({
        status: "User Already Exists",
        message: "User with this email already exists.",
      });
    }

    // Create a new user
    const newUser = new User({
      name,
      email,
      mobile,
      gender,
      nationality,
      address,
      message,
    });

    // Save the new user to the database
    await newUser.save();

    return res.status(201).json({
      status: "User Added Successfully to DB",
      message: {
        newUser,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: "Error during Adding Users!",
      message: err.message,
    });
  }
};

// ######################################## Login User #############################################

export const loginUser = async (req, res) => {
  try {
    const { email, mobile, password } = req.body;

    let user;
    if (email) user = await User.findOne({ email });
    else if (mobile) user = await User.findOne({ mobile });

    if (!user) {
      return res.status(401).json({
        message: "User Not Found",
      });
    }
    // password check
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json("Password is Incorrect");
    }

    // User authentication successful; create a JWT token
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.pass_key,
      {
        expiresIn: "24h",
      }
    );

    return res.status(200).json({
      message: "Login Successful",
      email: user.email,
      mobile: user.mobile,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

// homepage
export const getHomePage = (req, res) => {
  res.json({
    message: "Login Successfully",
    name: req.user.name,
    email: req.user.email,
  });
};
