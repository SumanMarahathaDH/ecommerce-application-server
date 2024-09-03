import { getUserByID } from "../services/userService.js"

export const isAdmin = async (req, res, next) => {
try{
    const id = req.user._id
    const user = await getUserByID(id)
    if(!user){
        return res.status(404).send({
            success: false,
            message: "User doesn't exists"
        })
    }
    if(user.role !== 1){ // here 1 means role with admin
        return res.status(401).send({
            success: false,
            message: "Unauthorized"
        })
    }
        next()
}
catch(error){
    res.status(500).send({
        success: false,
        message: "Something went wrong",
        error
    })
}
}