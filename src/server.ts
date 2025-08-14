import {Server} from 'http'
import app from './app'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
let server : Server
dotenv.config()
const PORT = process.env.PORT || 6500;
async function main(){
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log("connected to mongodb using mongoose successfully");
        server=app.listen(PORT,()=>{
            console.log(`app is listening on port ${PORT}` )
        })
    } catch (error) {
        console.log(error)
    }
}
main();