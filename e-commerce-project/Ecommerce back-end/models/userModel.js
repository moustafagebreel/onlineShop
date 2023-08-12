const mongoose = require("mongoose"); // Erase if already required
const bcrpt = require("bcrypt");

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      index: true,
    },
    lastName: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    refreshToken:{
      type:String
  },
    isBlocked:{
        type: Boolean,
        default:false
    },
    cart: {
      type: Array,
      default: [],
    },
    address: {
      type:String
    },
    wishlist: [
      {
        type:  mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    
  },
  {
    timestamps: true,
  }
);

//password hashing
userSchema.pre("save", async function (next) {
  const salt = await bcrpt.genSaltSync(10);
  this.password = await bcrpt.hash(this.password, salt);
});

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrpt.compare(enteredPassword, this.password);
};

//Export the model
module.exports = mongoose.model("User", userSchema);
