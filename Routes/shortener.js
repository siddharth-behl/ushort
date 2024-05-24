import express from "express"
import pages from "../controllers/shortener.js"
import urldata from "../models/urlstore.js"
import middleware from "../middlewares/auth.js"


const port=process.env.PORT
const router=express.Router()
//FAVICON.ICO REMOVER
router.get("/favicon.ico",(req,res)=>res.send(""))

//HOMEPAGE
router.get("/",pages.homepage_get)

//ANALYTICS
router.get("/analytics",pages.analytics)

//POST
router.post("/post",pages.homepage_post)

//WORKING OF URL SHORTENER
router.get("/:shortid",pages.siteopener)

router.get("/admin/urls",middleware.RestrictTo(['ADMIN']),pages.admin)



export default router