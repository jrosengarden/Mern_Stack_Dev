// 12/26/21 Jeff Rosengarden MBPro Silicon


// import  middleware
import express from 'express'                               // needed middleware installed in package.json
import cors from 'cors'                                     // needed middleware installed in package.json
import movies from './api/movies.route.js'                  // 
 
const app = express()                                       // create the server named app
 
app.use(cors())                                             // attach both cors and express.json middleware
app.use(express.json())                                     // express.json is JSON parsing middleware to enable server
                                                            // to read/accept JSON in a request's body

                                                            // middleware are functions that Express executes AFTER
                                                            // the incoming request and BEFORE the output.  Middlewares
                                                            // might also make changes to a request/response object
 
app.use("/api/v1/movies", movies)                           // specify the initial routes using standard protocol
app.use('*', (req,res)=>{                                   // any other route (which won't exist) will return the
     res.status(404).json(
          {error: "requested path not found"})             // "not found" message
})
 
export default app                                          // app (our server) is now exported as a module so that other
                                                            // files can import it since this is the file that will access
                                                            // the database and starts the server.  Doing this allows 
                                                            // seperating main server code from database code 
