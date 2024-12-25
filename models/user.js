const bcrypt = require("bcrypt");
const { Schema, model } = require("mongoose");
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
      default: "../public/images/user.png",
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

userSchema.static("matchPassword",async function(email, matchPassword){
    const user = await this.findOne({email})
    if(!user) throw new console.error('User not found!!');
    ;

    const salt = user.salt;
    const hashedPassword = user.password;
    
    // Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(matchPassword, user.password);
    if (!isMatch) throw new Error("Incorrect Password");
        
    return {...user, password: undefined, salt: undefined}

})
const User = model("user", userSchema);
module.exports = User;
