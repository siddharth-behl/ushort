import express from "express"
import ejs from "ejs"
import mongoconnector from "./connections/mongoose.js"
import urldata from "./models/urlstore.js"
import router from "./Routes/shortener.js"
import middlewares from "./middlewares/shortener.js"
import authrouter from "./Routes/auth.js"
import middleware from "./middlewares/auth.js"
import cookieParser from "cookie-parser"
import { baseurl } from "./middlewares/baseurl.js"
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT||3000
const app = express()

//MIDDLEWARES
app.use(middlewares.urlencoder())
app.use(baseurl)

//EJS


app.set("view engine", "ejs")
app.set("views", "./views")


//STATIC
app.use(express.static("./css"))
app.use(express.static("./javascript"))
app.use(express.static("./images"))
app.use(cookieParser())
//MONGOOSE

mongoconnector(process.env.mongo).then(() => {
    console.log("MONGODB CONNECTED SUCCESSFULLY")
})
.catch((err) => {
        console.log(err)
    })




//MIDDLEWARES






//ROUTES
app.use(authrouter)
app.use(middleware.RestrictToLoggedInUserOnly)
app.use(middleware.RestrictTo(['NORMAL','ADMIN']))
app.use(router)


//ALL
app.get("*",(req,res)=>res.render("404"))

//LISTEN
app.listen(port, () => {
    console.log("http://localhost:" + port)
})

