// 12/29/21 Jeff Rosengarden
// for connecting to the database and starting the server

import app from './server.js'                       // import app created in server.js
import mongodb from "mongodb"                       // declared in package.json
import dotenv from "dotenv"                         // declared in package.json
import MoviesDAO from './dao/moviesDAO.js'          // get reference to the moviesDAO file
                                                    // which has the definition of the MoviesDAO object
                                                    // along with the injectDB() & getMovies() methods
import ReviewsDAO from './dao/reviewsDAO.js'
 
async function main(){                              // create async function main() to connect to mongoDB cluster
                                                    // and call functions that access the database
     dotenv.config()                                // load the environment variables from .env                          
    
const client = new mongodb.MongoClient(             // create instance of MongoClient and pass URI retrieved from .env
process.env.MOVIEREVIEWS_DB_URI,
    {useNewUrlParser: true, useUnifiedTopology:true}    // options passed to the instantiated MongoClient
    )
    const port = process.env.PORT || 8000           // retrieve the port from .env and if inaccessible use port 8000
     try {
        // Connect to the MongoDB cluster
        await client.connect()                      // now wait until a connection to the database is made
	    await MoviesDAO.injectDB(client)            // but before starting server call injectDB to get the
                                                    // initial reference to the movies collection in the db
        await ReviewsDAO.injectDB(client)
 
        app.listen(port, () =>{                     // if connected with no issues the web server is started
            console.log('server is running on port:'+port);        // and displays this message
        })                                                          // and is now listening on the specified port
 
    } catch (e) {
        console.error(e);                           // if connection failed display error on console                            
        process.exit(1)                             // and terminate
    } 
}
 
main().catch(console.error);                        // main is now implemented so it's called and any errors are
                                                    // sent to the console
