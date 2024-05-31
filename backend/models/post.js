import mongoose from "mongoose";
const { Schema, model } = mongoose;

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true,

        },
        content: {
            type: String,
            required: true,

        },
        image: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default model("Post", postSchema);