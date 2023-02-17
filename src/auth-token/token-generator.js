import jwt from "jsonwebtoken"
require("dotenv").config();

export const tokenGenerator = (user) => {
    const payload = {
        id: user.id,
        email_id: user.email_id,
        
    }
    const token = jwt.sign(payload, process.env.SECRETKEY)
    return token
}