const { generateToken } = require("../config/jsonToken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongoDb");
const { generateRereshToken } = require("../config/refreshToken");
const jwt = require('jsonwebtoken');

const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } else {
    throw new Error("User Already Exist!");
  }
});

const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if(!cookie?.refreshToken){
    throw new Error('There is no refresh token in cookies')
  }else{
    const refreshToken = cookie.refreshToken;
    console.log(refreshToken)
    const user = await User.findOne({refreshToken})
    if(!user){
        throw new Error('No refresh token found in db or no matched refresh token')
    }
    jwt.verify(refreshToken , process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
        if(err||user.id!==decoded.id){
            throw new Error('Something is wrong with refresh token')
        }
        const accessToken = generateToken(user._id)
        res.json({accessToken})
    })
  }
});

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRereshToken(findUser?._id);
    const updateUser = await User.findByIdAndUpdate(
      findUser?.id,
      {
        refreshToken: refreshToken,
      },
      {
        new: true,
      }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findUser?._id,
      firstName: findUser?.firstName,
      email: findUser?.email,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findadmin = await User.findOne({ email });
  if(findadmin.role!=="admin"){
    throw new Error("Not an admin")
  }
  if (findadmin && (await findadmin.isPasswordMatched(password))) {
    const refreshToken = await generateRereshToken(findadmin?._id);
    const updateUser = await User.findByIdAndUpdate(
      findadmin?.id,
      {
        refreshToken: refreshToken,
      },
      {
        new: true,
      }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findadmin?._id,
      firstName: findadmin?.firstName,
      email: findadmin?.email,
      token: generateToken(findadmin?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

const userLogout = asyncHandler(async(req,res)=>{
    const cookie = req.cookies;
    if(!cookie.refreshToken) throw new Error('No refresh token in cookie');
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({refreshToken});
    if(!user){
        res.clearCookie("refreshToken",{
            httpOnly:true,
            secure:true
        });
        return res.sendStatus(204)
    }
    await User.findOneAndUpdate({refreshToken},{refreshToken:""});
    res.clearCookie("refreshToken",{
        httpOnly:true,
        secure:true
    });
    res.sendStatus(204)
})

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    throw new Error(error);
  }
});

const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    await User.deleteOne({ _id: id });
    res.json({ message: `Deleted User with id: ${id}` });
  } catch (error) {
    throw new Error(error);
  }
});

const updatedUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        firstName: req.body?.firstName,
        lastName: req.body?.lastName,
        email: req.body?.email,
        mobile: req.body?.mobile,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const block = await User.findByIdAndUpdate(
      id,
      { isBlocked: true },
      { new: true }
    );

    res.json({ message: "User blocked" });
  } catch (error) {
    throw new Error(error);
  }
});

const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const block = await User.findByIdAndUpdate(
      id,
      { isBlocked: false },
      { new: true }
    );
    res.json({ message: "User ublocked" });
  } catch (error) {
    throw new Error(error);
  }
});

const getWishlist = asyncHandler(
  async(req,res)=>{
    try {
      const {_id}=req.user;
      const user = await User.findById(_id).populate("wishlist");
      res.json(user)
    } catch (error) {
      throw new Error(error);
    }
  }
)

const saveAddress =asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        address: req.body?.address,
        
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  userLogin,
  getAllUsers,
  getUser,
  deleteUser,
  updatedUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  userLogout,
  adminLogin,
  getWishlist,
  saveAddress
};
