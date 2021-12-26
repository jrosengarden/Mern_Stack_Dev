import express from 'express'
import MoviesController from './movies.controller.js'
 
const router = express.Router() // get access to express router
 
router.route('/').get(MoviesController.apiGetMovies)
 
export default router
