import auth_data from "../models/auth.js"
import { v4 as uuidv4 } from 'uuid';
import { set_user } from "../services/auth.js";

// (async()=>console.log((await auth_data.find())[0].role="Super-ADmin"))()


async function auth_get(req, res) {
    res.render("auth",{baseurl:req.myurl})
}
async function auth_logout(req, res) {
    res.cookie("uid", null, {
        expires: new Date(0) // Set expiration to past
    });
    res.redirect("/login")

}

async function auth_post(req, res) {
    const email = req.body.email
    const password = req.body.password
    const new_email = req.body.nEmail
    const new_password = req.body.nPassword
    const name = req.body.Name
    const dob = req.body.DOB


    if (new_email && new_password && name && dob) {
        try {
            const new_data = await auth_data.create({
                Name: name,
                DOB: dob,
                Email: new_email,
                Password: new_password
            })

            const token = set_user(new_data)
            // Get the current date in UTC
            const currentDateUTC = new Date();

            // Convert UTC time to IST
            const currentDateIST = new Date(currentDateUTC.getTime() + 5.5 * 60 * 60 * 1000);
            console.log(currentDateIST)
            // Calculate the expiry date by adding 10 days to the current IST date
            const expiryDateIST = new Date(currentDateIST);
            expiryDateIST.setDate(currentDateIST.getDate() + 10);

            // Set the cookie expiry to the calculated expiry date
            res.cookie('uid', token, { expires: expiryDateIST });






            res.redirect("/")
        }
        catch (err) {
            console.log(err)
            res.render("auth", { exist: true,baseurl:req.myurl })
        }
    }
    else if (email && password) {

        const data = await auth_data.findOne({ Email: email })
        if (!data) {
            res.render("auth", { no_email: true,baseurl:req.myurl })
        }
        else if (data.Password !== password) {
            res.render("auth", { no_pass: true,baseurl:req.myurl })
        }
        else {
            const token = set_user(data)
            const currentDateUTC = new Date();

            // Convert UTC time to IST
            const currentDateIST = new Date(currentDateUTC.getTime() + 5.5 * 60 * 60 * 1000);
            console.log(currentDateIST)
            // Calculate the expiry date by adding 10 days to the current IST date
            const expiryDateIST = new Date(currentDateIST);
            expiryDateIST.setDate(currentDateIST.getDate() + 10);

            // Set the cookie expiry to the calculated expiry date
            res.cookie('uid', token, { expires: expiryDateIST });
            res.redirect("/")
        }
    }
    else {
        res.render("auth", { missing: true,baseurl:req.myurl })
    }







}
async function auth_post_rest(req, res) {
    const email = req.body.email
    const password = req.body.password
    const new_email = req.body.nEmail
    const new_password = req.body.nPassword
    const name = req.body.Name
    const dob = req.body.DOB



    if (new_email && new_password && name && dob) {
        try {
            const new_data = await auth_data.create({
                Name: name,
                DOB: dob,
                Email: new_email,
                Password: new_password
            })
            const token = set_user(new_data)

            // res.cookie('uid', token, { expires: expiryDateIST });
            res.json({ token })

        }
        catch (err) {
            console.log(err)
            res.render("auth", { exist: true,baseurl:req.myurl })
        }
    }
    else if (email && password) {

        const data = await auth_data.findOne({ Email: email })
        if (!data) {
            res.render("auth", { no_email: true,baseurl:req.myurl })
        }
        else if (data.Password !== password) {
            res.render("auth", { no_pass: true,baseurl:req.myurl })
        }
        else {
            const token = set_user(data)
            res.json({ token })
        }
    }
    else {
        res.render("auth", { missing: true,baseurl:req.myurl })
    }

}

export default { auth_get, auth_post, auth_logout, auth_post_rest }
