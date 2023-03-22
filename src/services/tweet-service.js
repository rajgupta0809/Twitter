import {TweetRepository, HashtagRepository} from '../repository/index.js' //we don't even need to write index here

class TweetService {
    constructor() {
        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagRepository();
    }

    async create(data){
        const content = data.content;
        const tags = content.match(/#[a-zA-Z0-9_]+/g).map(tag => tag.substring(1).toLowerCase()); //this regex extracts hashtags
        console.log("Tags are being generated : ",tags);
        const tweet = await this.tweetRepository.create(data);
        let alreadyPresentTags = await this.hashtagRepository.findByName(tags);
        let titleOfPresentTags = alreadyPresentTags.map((tag) => tag.title);
        let newTags = tags.filter(tag => !titleOfPresentTags.includes(tag));
        //now we have to convert back to the object form {title : srk} like this
        newTags = newTags.map(tag => {
            return {
                title:tag,
                tweets:[tweet.id]
            }
        });
        const response = await this.hashtagRepository.bulkCreate(newTags)
        //updateing the old hastags woth new tweets asynchronly as we are not waiting for it to complete
        alreadyPresentTags.forEach((tags) => {
            tags.tweets.push(tweet.id);
            tags.save();
        })
        return tweet;
    }
}

export default TweetService