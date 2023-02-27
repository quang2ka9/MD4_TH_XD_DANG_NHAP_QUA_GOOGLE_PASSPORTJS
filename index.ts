import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import session from "express-session";
import authRouter from "./src/router/authRouter";
import passport from "./src/meddleware/passport";


const PORT = 3000;
const app = express();
app.set('view engine', 'ejs');
app.set('views', './src/views');


const DB = 'mongodb://127.0.0.1:27017/dbTest';
mongoose.connect(DB)
    .then(()=>console.log('DB Connected'))
    .catch(error =>console.log('DB connection error:', error.message));

app.use(bodyParser.json());
app.use(session({
    secret: 'SECRET',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60 * 60 * 1000}
}));

app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRouter)

app.listen(PORT, ()=>{
    console.log("App running on port:" + PORT)
})
