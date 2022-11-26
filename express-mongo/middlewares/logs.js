const log = (req,res,next)=>{
    console.log(`Terdapat request ke PATH : ${req.path} dengan method ${req.method}`)
    if(req.method === 'POST'){
        console.log('Terdapat request body yang masuk dengan detail : ', req.body)
    }
    next()
}

module.exports = log