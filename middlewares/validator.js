import {validationResult} from 'express-validator'

export const validator = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).send({
            success: false,
            message: 'Bad Request',
            errors: errors.array()
        })
    }
    else {
        next()
    }
}