import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      max: [250, "Tweet cannot be more than 250 characters"],
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Like',
        }
    ]
  },
  { timestamps: true }
);
//Schema is a blueprint like class and model is an instance of the Schema
const Tweet = mongoose.model("Tweet", tweetSchema);
export default Tweet;
