import TweetService from "../services/tweet-service.js";

const tweetService = new TweetService()

export const createTweet = async (req, res) => {
    try {
        const response = await tweetService.create(req.body)
        return res.status(201).json({
            success:true,
            message:"Tweet Successfully created",
            err:{},
            data:response,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong",
            err:error,
            data:{},
        })
    }
}