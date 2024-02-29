//Cecilia Bruce, 2/29/24, IT302 Section 002, Phase 2 Assignment, bb455@njit.edu
import express from 'express'
import ComicsController from './comics.controller.js'

const router = express.Router()

router.route('/').get(ComicsController.apiGetComics)

export default router
