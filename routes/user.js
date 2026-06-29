const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync.js");
const { saveRedirectUrl } = require("../middleware.js");



router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});


router.post("/signup", wrapAsync(async (req, res) => {
    try {
        let { username, email, password } = req.body;
        username = username.trim();  // 🚨 remove hidden spaces
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUse, (err) => { // this req.login block so that after sign up automatic log in happens
            if(err) {
                return next(err);
            }
            req.flash("success", "Welcome to Wanderlust");
            res.redirect("/listings");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}));


//try-catch used so that if user already registered messege pops up we get redirected again to signup page

router.get("/login", (req, res) => {
    res.render("users/login.ejs");
});


router.post("/login", 
    saveRedirectUrl, // so that add new listing page -> login page -> add new listing page again not the home page
    passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }),
    async(req, res) => {
        req.flash("success", "Welcome back!");
        let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
    }
);

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if(err) {
            next(err);
        } 
        req.flash("success", "you are logged out!");
        res.redirect("/listings");
    })
})


module.exports = router;