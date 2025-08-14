import {Server} from 'http'
import app from './app'
import mongoose from 'mongoose'

let server : Server
const PORT = 6500;
async function main(){
    try {
        await mongoose.connect('mongodb+srv://sayed:12345@cluster1.bmyln.mongodb.net/advanced-noteApp?retryWrites=true&w=majority&appName=Cluster1');
        console.log("connected to mongodb using mongoose successfully");
        server=app.listen(PORT,()=>{
            console.log(`app is listening on port ${PORT}` )
        })
    } catch (error) {
        console.log(error)
    }
}
main();