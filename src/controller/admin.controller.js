import zod from "zod"
import jwt from "jsonwebtoken"
import Admin from "../models/Admin.models.js"
import hashingPassword from "../utils/HashingPassword.js"
import generateRefreshToken from "../utils/GenerateRefreshToken.js"

const zodRegBody = zod.object({
    email: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})

const register = async (req, res) => {
    const { success } = zodRegBody.safeParse(req.body)  // check if user response is valid
    if (!success) {
        res.status(401).send({ msg: "user credential invalid" })
    }
    else {
        const userAlreadyExists = await Admin.findOne({
            email: req.body.email
        }) // check user is already exists 
        if (!userAlreadyExists) {
            try {
                const JWT_S = process.env.JWT_SECRET
                const hashedPassword = hashingPassword(req.body.password) // hashing password and saving in to db

                const admin = await Admin.create({
                    email: req.body.email,
                    password: hashedPassword,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,

                })
                const refreshToken = generateRefreshToken(admin)
                try {
                    const re = await admin.updateOne({
                        refreshToken: refreshToken
                    })
                } catch (error) {
                    console.log(error);
                    res.send({
                        msg: "error in creating refresh token"
                    })
                }

                const userId = admin._id
                //sand user auth token
                const token = jwt.sign({
                    userId,
                    email: req.body.email,
                }, JWT_S)
                return res.status(200).send({
                    msg: "user created successfully ",
                    token: token,
                    refreshToken: refreshToken
                })
            } catch (error) {
                console.log(error);
                res.status(400).send({
                    msg: "error in creating user"
                })
            }
        }
        res.status(201).send({
            msg: "user Already Exists"
        })
    }
}

const zodLoginBody = zod.object({
    email: zod.string().email(),
    password: zod.string(),
})

const login = async (req, res) => {
    const { success } = zodLoginBody.safeParse(req.body)
    if (!success) { // check if user response is valid
        res.status(401).send({ msg: "user credential invalid" })
    }
    else {
        const { email, password } = req.body
        try {
            const admin = await Admin.findOne({
                email: email
            }) // check user is already exists 
            if (!admin) {
                res.status(404).send({
                    msg: "user not found"
                })
            }
            const JWT_S = process.env.JWT_SECRET
            const unHashedPassword = jwt.verify(admin.password, JWT_S) // unhashed password from db
            if (!(unHashedPassword.password === password)) { // check if unhashde password and res body password is same 
                res.status(401).send({
                    msg: "user credential invalid"
                })
            } else {
                const refreshToken = generateRefreshToken(admin)
                try {
                    const re = await Admin.updateOne({
                        refreshToken: refreshToken
                    })
                } catch (error) {
                    console.log(error);
                    res.send({
                        msg: "error in creating refresh token"
                    })
                }
                res.status(200).send({
                    msg: "user logged in successfully",
                    email: email,
                    refreshToken: refreshToken
                })
            }

        }
        catch (error) {
            console.log(error);
        }
    }
}

const authRefreshToken = (req, res) => {
    const refreshToken = req.params.token
    const JWT_R_S = process.env.JWT_REFRESH_SECRET
    try {
        const authRToken = jwt.verify(refreshToken, JWT_R_S)
        console.log(authRToken);
        res.send({
            userValid: true
        })
    } catch (error) {
        res.send({
            userValid: false
        })

    }

}
export {
    register,
    login,
    authRefreshToken
}