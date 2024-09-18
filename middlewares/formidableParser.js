import formidable from 'formidable'

export const formidableParser = (req, res, next) => {
    const form = formidable({multiples: true})

    form.parse(req, (error, fields, files) => {
        if(error){
            return res.status(500).send({
                success: false,
                message: "Something went wrong",
                error
            })
        }
        req.body = fields
        req.files = files
        next()
    })
}