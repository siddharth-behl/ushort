import { url } from "inspector"
import urldata from "../models/urlstore.js"
import rand from "../utils/shortidgen.js"
import axios from "axios"
import ipgen from "../utils/ipgen.js"
import ip_jsn from "../JSON/ip addresses.json" assert{type: "json"}
import auth_data from "../models/auth.js"
const letter = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"

const letters = letter.split("")
const port = process.env.PORT



//HOMEPAGE GET 

function homepage_get(req, res) {


    return res.render("homepage",{baseurl:req.myurl})
}





//HOMEPAGE POST

async function homepage_post(req, res) {

    const url = req.body.url
    if (url) {
        const ip = req.ip
        const data = {
            shortID: rand(letters),
            redirecturl: url,
            clicks: 0,
            location: [],
            time: [],
            auth_data:req.authentication_data._id

        }
        const finaldata = await urldata.create(data)


        res.render("homepage", { url: req.myurl+"/"+finaldata.shortID,baseurl:req.myurl})

    }
    else {
        res.redirect("/")
    }


}

//WORKING OF THE SHORT URL

async function siteopener(req, res) {
    const shortid = req.params.shortid


    const location = await axios.get(`http://ip-api.com/json/${req.ip}`)

    
    const elem = await urldata.findOneAndUpdate({ shortID: shortid }, { $inc: { clicks: 1 }, $push: { location: location.data, time: new Date().toLocaleString('en-US', { timeZone: "Asia/Kolkata" }) } }, { new: true })

    if (elem) {
        res.redirect(elem.redirecturl)
    }
    else {
        res.render("404",{baseurl:req.myurl})
    }

}





//ANALYTICS
async function analytics(req, res) {
    const data_for_analysis = await urldata.find({ auth_data:req.authentication_data })
   
    if (data_for_analysis) {
        res.render("analytics", { data: data_for_analysis ,baseurl:req.myurl})
    }
    
}

async function admin(req,res){
    const all_userdata=await (urldata.find({}).populate('auth_data'))
    console.log(all_userdata)
    if(!all_userdata)return res.end('No Data Found')
    else return res.render("admin",{data:all_userdata,baseurl:req.myurl})
}


//EXPORT
export default { homepage_get, homepage_post, siteopener, analytics,admin }


