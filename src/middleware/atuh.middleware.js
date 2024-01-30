import jwt from "jsonwebtoken"
import Admin from "../models/Admin.models.js"

const authMiddleware = async (req, res, next) => {
    try {
        const JWT_S = process.env.JWT_SECRET
        const token = req.headers.token
        const decodedToken = jwt.verify(token, JWT_S)
        if (!decodedToken) {
            res.status(401).send({
                msg: "token is not valid"
            })
        }

        const admin = await Admin.findOne({ email: decodedToken.email })
        if (!admin) {
            res.status(403).send({ msg: "user does not exist" })
        } else {
            next()
        }
    } catch (error) {
        console.log(error);

    }
}


export default authMiddleware

