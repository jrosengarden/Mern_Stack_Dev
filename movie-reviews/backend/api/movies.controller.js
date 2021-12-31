// 12/26/21 Jeff Rosengarden

import MoviesDAO from '../dao/moviesDAO.js'                                     // import the dao (data access object)
 
export default class MoviesController{
 
    static async apiGetMovies(req,res,next){                                    // call apiGetMovies 
                                                                                // if called via URL handle the query string
                                                                                // with moviesPerPage or default to 20
                                                                                // with page to start at or default to 0
        const moviesPerPage = req.query.moviesPerPage ? parseInt(req.query.moviesPerPage) : 20
        const page = req.query.page ? parseInt(req.query.page) : 0
 
        let filters = {}
	if(req.query.rated){                                                        // if query is requesting 'rated'   
            filters.rated = req.query.rated                                     // setup filters.rated with value requested
        } 
        else if(req.query.title){                                               // if query is requesting 'title'
            filters.title = req.query.title                                     // setup filters.title with value requested
        }
 
                                                                                // now call getMovies in MoviesDAO
                                                                                // which will return
                                                                                //      moviesList & totalNumMovies
        const { moviesList, totalNumMovies } = await MoviesDAO.getMovies({filters, page, moviesPerPage})
 

                                                                                // now send a JSON response with the above
                                                                                // fetched info to whoever called this URL
        let response ={
            movies: moviesList,
            page: page,
            filters: filters,
            entries_per_page: moviesPerPage,
            total_results: totalNumMovies,
        }
        res.json(response)
    }
}
