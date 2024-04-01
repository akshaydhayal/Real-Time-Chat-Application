import jwt from "jsonwebtoken";

export default function generateJwtToken(payload){
    const token=jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:'15d'
    })
    return token;
}