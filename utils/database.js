import mongoose from "mongoose"
import { databaseConfig } from "../config/database.js"

export const startDatabase = () => {
    const url = databaseConfig.databaseUrl
    mongoose.connect(url)
    .then((data) => console.log("Database started successfully"))
    .catch(err => console.log("There is problem connecting database. Please try again later!"))
}