import jwt from "jsonwebtoken"
const generateRefreshToken = (user) => {
    const JWT_S = process.env.JWT_SECRET
    const JWT_R_S = process.env.JWT_REFRESH_SECRET
    const refreshToken = jwt.sign({
        data: user?.email,
        JWT_R_S
    }, JWT_S,
        { expiresIn: '12h' }
    )
    return refreshToken
}

export default generateRefreshToken