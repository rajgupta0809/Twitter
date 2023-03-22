import mongoose  from 'mongoose'

const tweetSchema = new mongoose.Schema({
    content: {
        type:String,
        required:true,
        max:[250, 'Tweet cannot be more than 250 characters']
    },
},{timestamps:true});
//Schema is a blueprint like class and model is an instance of the Schema
const Tweet = mongoose.model('Tweet', tweetSchema)
export default Tweet