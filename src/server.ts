import express from "express";
import router from "./router";
import { stripColors } from "colors";
import cors, { CorsOptions } from 'cors' 
import SwaggerUi  from "swagger-ui-express";
import db from "./config/db";
import swaggerSpec from "./config/swagger";
import morgan from "morgan";


// DB Conexion
export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        // console.log(stripColors('db connected successfuly').green.bold)
    } catch (error) {
        // console.log(error)
        console.log(stripColors('DB connection error').red.bold)
    }
}

connectDB()

// instancia de Express
const server = express()

// Accepted Conections
const corsOptions : CorsOptions = {
    origin: function(origin, callback) {
        if(origin === process.env.FRONTEND_URL) {
            callback(null, true)
        } else {
            callback(new Error('CORS ERROR'))
        }
    }
}
server.use(cors(corsOptions))

// Read data from forms
server.use(express.json())
server.use(morgan('dev'))

server.use('/api/products', router)

// Docs
server.use('/docs', SwaggerUi.serve, SwaggerUi.setup(swaggerSpec))



export default server