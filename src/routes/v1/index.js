import express from 'express'
import  {createTweet} from '../../controllers/tweet_controller.js'

const router = express.Router();

router.post('/tweets', createTweet);

export default router;