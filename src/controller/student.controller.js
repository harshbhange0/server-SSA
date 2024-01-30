import zod from "zod"
import jwt from "jsonwebtoken"
import Student from "../models/Student.models.js"
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
        const studentAlreadyExists = await Student.findOne({
            email: req.body.email
        }) // check student is already exists 
        if (!studentAlreadyExists) {
            try {
                const JWT_S = process.env.JWT_SECRET
                const hashedPassword = hashingPassword(req.body.password) // hashing password and saving in to db

                const student = await Student.create({
                    email: req.body.email,
                    password: hashedPassword,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,

                })
                const refreshToken = generateRefreshToken(student)
                try {
                    const rs = await student.updateOne({
                        refreshToken: refreshToken
                    })
                } catch (error) {
                    console.log(error);
                    res.send({
                        msg: "error in creating refresh token"
                    })
                }

                const studentId = student._id
                //sand student auth token
                const token = jwt.sign({
                    studentId,
                    email: req.body.email,
                }, JWT_S)
                return res.status(200).send({
                    msg: "student created successfully ",
                    token: token,
                    refreshToken: refreshToken
                })
            } catch (error) {
                console.log(error);
                res.status(400).send({
                    msg: "error in creating student"
                })
            }
        }
        res.status(201).send({
            msg: "student Already Exists"
        })
    }
}

const zodLoginBody = zod.object({
    email: zod.string().email(),
    password: zod.string(),
})

const login = async (req, res) => {
    const { success } = zodLoginBody.safeParse(req.body)
    if (!success) { // check if student response is valid
        res.status(401).send({ msg: "student credential invalid" })
    }
    else {
        const { email, password } = req.body
        try {
            const student = await Student.findOne({
                email: email
            }) // check student is already exists 
            if (!student) {
                res.status(404).send({
                    msg: "student not found"
                })
            }
            const JWT_S = process.env.JWT_SECRET
            const unHashedPassword = jwt.verify(student.password, JWT_S) // unhashed password from db
            if (!(unHashedPassword.password === password)) { // check if unhashde password and res body password is same 
                res.status(401).send({
                    msg: "student credential invalid"
                })
            } else {
                const refreshToken = generateRefreshToken(student)
                try {
                    const re = await Student.updateOne({
                        refreshToken: refreshToken
                    })
                } catch (error) {
                    console.log(error);
                    res.send({
                        msg: "error in creating refresh token"
                    })
                }
                res.status(200).send({
                    msg: "student logged in successfully",
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
            studentValid: true
        })
    } catch (error) {
        res.send({
            studentValid: false
        })

    }

}
export {
    register,
    login,
    authRefreshToken
}