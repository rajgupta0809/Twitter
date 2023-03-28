import { LikeRepository, TweetRepository } from "../repository/index.js";

class LikeService {
    constructor(){
        this.likeRepository = new LikeRepository();
        this.tweetRepository = new TweetRepository();
    }

    async toggleLike(modelId, userId, modelType){
        if(modelType == 'Tweet'){
            //Likeable is that tweet whose like gonna be toggle
            var likeable = await this.tweetRepository.find(modelId); 
            console.log(likeable);
        }else if(modelType == 'Comment'){

        }else{
            throw new Error('Unknown Model Type')
        }

        const exists = await this.likeRepository.findByUserAndLikeable({
            user: userId,
            onModel:modelType,
            likeable: modelId,
        })
        console.log("Exists", exists);
        if(exists){
            likeable.likes.pull(exists.id);
            await likeable.save();
            await exists.deleteOne();
            var isRemoved = true;
        }else {
            const newLike = await this.likeRepository.create({
                user:userId,
                onModel:modelType,
                likeable:modelId,
            })

            likeable.likes.push(newLike);
            await likeable.save();
            var isRemoved = false;
        }
        return isRemoved;
    }
}
export default LikeService