// 12/26/21 Jeff Rosengarden MBPro Silicon
// This line added from MBPro @ 12/26/21 12:45PM
// This line added from iMac5K @ 12/26/21 12:48PM

import express from 'express'
import cors from 'cors'
import movies from './api/movies.route.js'
 
const app = express()
 
app.use(cors())
app.use(express.json())
 
app.use("/api/v1/movies", movies)
app.use('*', (req,res)=>{
     res.status(404).json({error: "not found"})
})
 
export default app
