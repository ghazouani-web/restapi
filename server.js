const express = require("express");
const connectDB = require("./config/connectDB")
const app = express();

//4-
const User = require("./models/User");
//3-setup env variables
require("dotenv").config({path: "./config/.env"});

// parse the data to json (body -parser)

app.use(express.json());

//2-connect the data base

connectDB();

//-----------------start the crud---------------------------

// get all users

// path :/api/users


 app.get("/api/users",(req, res) => {
    User.find().then((users) => res.send({ msg: "get users", users})  ).catch((err) => res.send({msg: "ERROR", err})  )
 });


 // get user by id
 // path : /api/users/:usersID

 app.get(" /api/users/:usersID" , (req, res) => {
     const id = req.params.userID;
     User.findById(id).then((user) => {
        if (!user) {
            return res.status(404).send({ msg: "User Not Found " });
          }
         res.send(user);
     })
     .catch((err) => res.status(400).send({ msg: "ERROR GET USER BY ID" }));
     });

    // ADD A USER*
    // path :/api/add_user
    app.post("/api/add_user", (req , res)=>{
        const{ name, lastName,email,phone} = req.body;
        const newUser = new User ({  name, lastName,email,phone });
        newUser
        .save()
        .then((user) => res.send( user ) ) 
        .catch((err) => res.status(400).send({ msg: "ERROR ADD" }));
    });


    //edit user by id
    //path :/api/users/:usersID

    app.put("/api/users/:userID", (req, res) => {
        const userID = req.params.userID;
        User.findByIdAndUpdate(userID, req.body, { new: true })
          .then((user) => {
            if (!user) {
              return res.status(404).send({ msg: "User Not Found " });
            }
            res.send(user);
          })
          .catch((err) => res.status(400).send({ msg: "ERROR" }));
      });
      


    //remove user by id
   //path :/api/users/:usersID
   app.delete("/api/users/:usersID",(req , res) => {
       const id = req.params.usersID;
       User.findByIdAndDelete(id).then((user) => {
           if(!user) {
             return res.status(404).send({ msg :"user not found"});
           }
       res.send(user);
        })
    .catch((err) => res.status(400).send({msg : "err remove user"}));

   });







//------------------end crud---------------------------------


//1-start the server
const port = 3000;
app.listen(port, ()=>{
    console.log(`the server id running on port :http//localhost:${port}`)
})