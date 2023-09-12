const User = require("../models/User")
const cloudinary = require("cloudinary")

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, city, avatar } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "users_avatars"
    })

    user = await User.create({
      name, email, password, city, avatar: {
        public_id: myCloud.public_id, url: myCloud.secure_url
      }

    })

    res.status(200).json({
      user,
      success: true,
      message: "User registered successfully"
    })

  } catch (error) {

    console.log(error)
    res.status(404).json({
      success: false,
      message: error.message
    })
  }
}

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email })
      .select("+password")


    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = await user.getJWTToken();

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(201).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

exports.logoutUser = async (req, res) => {
  try {
    res.cookie("token", "none", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    });
    res.status(200).json({
      success: true,
      message: "Logged out successfully"
    })

  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    })
  }
}

exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
