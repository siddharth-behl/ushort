import express from "express"
import auth from "../controllers/auth.js"
const authrouter=express.Router()


authrouter.get("/login",auth.auth_get)
authrouter.post("/login/post",auth.auth_post)
authrouter.get("/logout",auth.auth_logout)
authrouter.post("/api/login",auth.auth_post_rest)
export default authrouter




