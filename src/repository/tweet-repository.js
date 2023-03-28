import Tweet from "../models/tweet.js";
import CrudRepository from "./crud-repository.js";

class TweetRepository extends CrudRepository {
  constructor() {
    super(Tweet);
  }

  async create(data) {
    try {
      const tweet = await Tweet.create(data);
      return tweet;
    } catch (error) {
      console.log(error);
    }
  }

  async update(tweetID, data) {
    try {
      const tweet = await Tweet.findByIdAndUpdate(tweetID, data, { new: true });
      return tweet;
    } catch (error) {
      console.log(error);
    }
  }

  //pagination function
  async getAll(offset, limit) {
    try {
      const tweet = await Tweet.find().skip(offset).limit(limit);
      return tweet;
    } catch (error) {
      console.log(error);
    }
  }

  async find(id) {
    try {
      const tweet = await Tweet.findById(id).populate({path:'likes'});
      return tweet;
    } catch (error) {
      console.log(error);
    }
  }
}

export default TweetRepository;
