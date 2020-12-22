const mongoose = require("mongoose");

const { MONGO_URL } = require("./.env")


function connectDB(){
const option ={
    useNewUrlParser: true,
    useFindAndModify:true,
    useUnifiedTopology:true


}

    mongoose.connect(process.env.MONGO_URL,option)
    .then(()=>{
        console.log("the database is connected...");
    })
    .catch((err)=>console.log(err));

}

module.exports = connectDB;