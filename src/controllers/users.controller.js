import { asyncHandler } from "../utils/asyncHandler.js"
import { apiError } from "../utils/apiError.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { User } from "../models/user.model.js"
import { apiResponse } from "../utils/apiResponse.js"

const registerUser = asyncHandler( async (req, res)=>{
    const {username,fullname,email,password}= req.body
    
    if (
        [username,fullname,email,password].some((field)=> 
            field?.trim() === '')
    ){
        throw new apiError(400,"All fields are required")
    }
    
    // Does user with Given email or username already exist ? 
    const isExisted = User.findOne({ 
        $or: [{username},{email}]
    })

    if (isExisted){
        throw new apiError(409, "This username or email already exists!")
    }

    // Geting Local-Path for Files on Server via Multer..

    const avaterLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverimage[0]?.path

    if (!avaterLocalPath){
        throw new apiError(400,"Avatar file s Required")
    }


    // Files upload to Cloudinary 
    const avater = await uploadOnCloudinary(avaterLocalPath)
    const coverimage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avater){
        throw new apiError(400,"Avatar is required!")
    }

    // Enry To DB 
    const user = await User.create({
        fullname,
        username,
        password,
        email,
        avatar: avater.url,
        coverimage: coverimage?.url || "",
    })

    const createdUser =  await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser){
        throw new apiError(500, "Oops! Somthing went wrong while Registering the User")
    }

    // Api Response
    return res.status(200).json(
        new apiResponse(200,createdUser,"User Created Successfuly!")
    )
})

export {registerUser}