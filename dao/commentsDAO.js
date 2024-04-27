//Cecilia Bruce, 03/22/24, IT 302 Section 002, Phase 3 Assignment, bb455@njit.edu
import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let comments
export default class CommentsDAO {
  static async injectDB(conn) {
    if(comments) {
      return
    } try {
      comments = await conn.db(process.env.COMICS_NS).collection('comments')
    } catch(e) {
      console.error(`unable to establish connection handle in commentsDAO: ${e}`)
    }
  }

  static async addComment(comicId, user, comment, date) {
    try {
      const commentDoc = {
        name: user.name,
        user_id: user._id,
        date: date,
        comment: comment,
        comic_id: new ObjectId(comicId)
      }
      return await comments.insertOne(commentDoc)
    } catch(e) {
      console.error(`unable to post comment: ${e}`)
      console.error(e)
      return { error: e }
    }
  }
        static async updateComment(commentId, userId, comment, date) {
                try {
                        const updateResponse = await comments.updateOne(
                                { user_id: userId, _id: new ObjectId(commentId) },
                                { $set: { comment: comment, date: date } }
                        )
                        return updateResponse
                } catch(e) {
                        console.error(`unable to update comment: ${e}`)
                        console.error(e)
                        return { error: e}
                }
        }
	static async deleteComment(commentId, userId) {
                 try {
                         const deleteResponse = await comments.deleteOne({
                                 _id: new ObjectId(commentId),
                                 user_id: userId,
                         })
                         return deleteResponse
                 } catch(e) {
                         console.error(`unable to delete comment: ${e}`)
                         console.error(e)
                         return { error: e.message }
                 }
         }
}
