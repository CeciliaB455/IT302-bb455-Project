//Cecilia Bruce, 4/26/24, IT302 Section 002, Phase 5 Assignment, bb455@njit.edu
import express from 'express'
import ComicsController from './comics.controller.js'
import CommentsController from './comments.controller.js'

const router = express.Router()

router.route('/').get(ComicsController.apiGetComics)
router.route("/id/:id").get(ComicsController.apiGetComicById)

router
         .route("/comment")
         .post(CommentsController.apiPostComment)
         .put(CommentsController.apiUpdateComment)
         .delete(CommentsController.apiDeleteComment)

export default router
