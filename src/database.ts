import mongoose from "mongoose";

const connectDb = async()=>{
    try{
await mongoose.connect('mongodb+srv://aashutosh2021:Aashu12122@cluster1.ik1zz.mongodb.net/Fastify_Nodejs?retryWrites=true&w=majority&appName=Cluster1')
    console.log('DB connected ---')
} catch(err){
        console.log(err);
return err;
    }
}

export default connectDb;