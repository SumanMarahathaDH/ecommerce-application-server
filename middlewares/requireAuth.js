import JWT from 'jsonwebtoken'

export const requireAuth = (req, res, next) => {
    try{
        const authorization = req.headers.authorization
        if(!authorization){
            return res.status(401).send({
                success: false,
                message: "Unauthorized"
            })
        }
        const token = authorization.split(" ")[1]
        const decode = JWT.verify(token, process.env.JWTSECRET)
        req.user = decode
        next()
    }
    catch(error){
        res.status(403).send({
            success: false,
            message: "Token Expired"
        })
    }
}