const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const register = async (req, res, next) => {
    try {
        let salt = bcrypt.genSaltSync(10)
        let hash_password = bcrypt.hashSync(req.body.password, salt)

        let user = new User({
            email: req.body.email,
            password: hash_password,
            visibility: req.body.visibility
        })

        await user.save()
        res.send({
            "response": "User created"
        })

    } catch (error) {
        req.err = error
        next()
    }
}


const login = async (req, res, next) => {
    try {


        let user = await User.findOne({ email: req.body.email })
        if (!user) {
            res.status(404).send({ error: "user not found" })
            return
        }
        let is_valid = bcrypt.compareSync(req.body.password, user.password)
        if (!is_valid) {
            res.status(400).send({ error: "wrong password" })
            return
        }
        let token = jwt.sign({
            email: user.email,
            visibility: user.visibility,
            is_admin: user.is_admin
        }, process.env.JWT)

        res.cookie("access_token", token, { httpOnly: true }).send({ response: "logged in successgully!" })

    } catch (error) {
        req.err = error
        next()
    }
}

module.exports = { register, login }