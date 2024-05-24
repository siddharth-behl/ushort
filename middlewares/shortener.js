import express from "express"
function urlencoder(){
    return express.urlencoded({extended:false})
}
export default {urlencoder}