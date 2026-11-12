import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [50, 'Name must be under 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      unique : true
    },
    profileImage:{
        type : String,
        default :""
    }
  },
  { timestamps: true } // adds createdAt and updatedAt
);
// Hash password before saving
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  
  // Instance method to compare passwords
  userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };
  
  // Remove password when converting to JSON
  userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
  };
const User = mongoose.model("User", userSchema);
export default User;

