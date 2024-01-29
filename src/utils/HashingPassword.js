import jwt from "jsonwebtoken"

const hashingPassword =  (password) => {
    const JWT_S = process.env.JWT_SECRET
    const hashedPassword =  jwt.sign({
        password: password
    }, JWT_S)
    return hashedPassword
}
export default hashingPassword