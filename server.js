//Cecilia Bruce, 2/29/24, IT 302 Section 002, Phase 2 Assignment, bb455@njit.edu
import express from 'express'
import cors from 'cors'
import comics from './api/comics.route.js'
import dotenv from "dotenv"

//dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/bb455/comics", comics)
app.use('*', (req, res) =>{
	res.status(404).json({error: "Not Found"})
})

export default app

