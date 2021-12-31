// 12/26/21 Jeff Rosengarden

let movies                                                              // movies stores reference to db
 
export default class MoviesDAO{                                         // export class MoviesDAO
    static async injectDB(conn){                                        // with async method injectDB
        if(movies){                                                     // if reference already exists
            return                                                      // return (don't need/want 2nd reference)
        }
        try{                                                            // else
            movies = await conn.db(process.env.MOVIEREVIEWS_NS)         // connect to the db name and
                        .collection('movies')                           // and the 'movies' collection within the db
        } 
        catch(e){                                                       // if getting connection to db fails
            console.error(`unable to connect in MoviesDAO: ${e}`)       // send error msg to console
        }
    }

    static async getMovies({                                            // async method getMovies which accepts
                                                                        // a filter object as it's 1st argument
                                                                        // the default filter has no filters
                                                                        // retrieves results starting at page 0
                                                                        // with 20 movies per page
                                                                        // Possible filters are "title" and "rated"
        filters = null,
        page = 0,
        moviesPerPage = 20, // will only get 20 movies at once
    } = {}){
        let query                                                       // create query with filters object
        if(filters){ 
            if("title" in filters){                                     // does filters contain "title"??
                query = { $text: { $search: filters['title']}}          // if so search by title
            }else if("rated" in filters){                               // does filters contain "rated"??
                query = { "rated": { $eq: filters['rated']}}            // if so search by rated
            }                                
        }
 
        let cursor                                                      // find all movies that fit query & assign to cursor
        try{
            cursor = await movies
            .find(query)
            .limit(moviesPerPage)                                       // set cursor limit
            .skip(moviesPerPage * page)                                 // set cursor skip value
            const moviesList = await cursor.toArray()                   // set moviesList to cursor 
            const totalNumMovies = await movies.countDocuments(query)   // set totalNumMovies
            return {moviesList, totalNumMovies}                         // return moviesList & totalNumMovies
        }
        catch(e){                                                       // if there is any error just return
            console.error(`Unable to issue find command, ${e}`)         // empty moviesList and totalNumMovies=0
            return { moviesList: [], totalNumMovies: 0}
        }
    }
}

