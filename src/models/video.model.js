import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true
        },
        videoFile: {
            type: String, // Cloudinary
            required: true
        },
        thumbnail: {
            type: String, // Cloudinary
            required: true
        },
        owner: {
            type: Schema.Types.ObjectId, 
            ref: "User",
            required: true
        },
        duration: {
            type: Number, // Cloudinary
        },
        Views: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: true 
        }
    }, { timestamps: true }
)

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema)