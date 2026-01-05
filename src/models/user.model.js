import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            lowercase: true,
            max: [18 , "Character must be under 18!"],
            unique: true,
            trim: true,
            index: true
        },
        fullname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },
        password: {
            type : Number,
            required: [true, "Password is required"],
            min: [8 , "Password must contain atleast 8 characters"]
        },
        watchlist: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        avatar: {
            type: String, // Cloudinary 
            required: true
        },
        overimage: {
            type: string, // Cloudinary
        }
    }, {timestamps: true}
)

userSchema.pre("save", async function (next){
    if (!this.isModified(password)) return next()

    this.password = bcrypt.hash(this.password)
    next()
})

userSchema.methods.isPasswordCorrect =  async function (password) {   
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function (){
    jwt.sign(
        {
            _id: this.id,
            email: this.email,
            username: this.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function (){
    jwt.sign(
        {
            _id: this.id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)