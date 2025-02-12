const bcrypt = require("bcrypt");
const { Schema, model } = require("mongoose");
const { createTokenForUser } = require("../services/authentication");
const saltRounds = 10;
const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: "/images/user.png",
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return;

   // Define the cost factor for hashing
  const salt = await bcrypt.genSalt(saltRounds); // Generate a salt
  const hash = await bcrypt.hash(user.password, salt); // Hash the password with the salt

  user.password = hash; // Update the password field with the hash
  user.salt = salt; // Optionally store the salt (if needed)
  next();
});

// Adding a static method "matchPassword" to the User schema
// This function checks if the provided password matches the stored hashed password
userSchema.static("matchPasswordAndGenerateToken",async function(email, matchPassword){
  // Find the user by email in the database
    const user = await this.findOne({email})
    console.log(user);
    
    // If no user is found, throw an error
    if(!user) throw new console.error('User not found!!');
    ;
    // Retrieve the stored hashed password and salt
    const salt = user.salt;
    const hashedPassword = user.password;
    
    // Compare the provided password with the stored hashed password using bcrypt
    const isMatch = await bcrypt.compare(matchPassword, user.password);

    // If passwords don't match, throw an error
    if (!isMatch) throw new Error("Incorrect Password");
    
    // Return user data but remove password and salt for security reasons 
    // Spread oprator is used to update the user(object) by makeing the password and salt undefined
    return token = createTokenForUser(user)

})
const User = model("user", userSchema);
module.exports = User;
