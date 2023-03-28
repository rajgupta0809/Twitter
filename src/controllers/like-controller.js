import LikeService from '../services/like-service.js'

const likeservice = new LikeService()

export const toggleLike = async (req, res)=> {

    try {
        const response = await likeservice.toggleLike(req.query.modelId, req.body.userId, req.query.modelType)
        return res.status(200).json({
            success:true,
            data:response,
            err:{},
            message:"Successfully toggled the like"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            data:{},
            err:error,
            message:"Something Went wrong"
        })
    }
}