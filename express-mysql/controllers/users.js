const getAllUsers = (req,res)=>{
    res.json({
        message:'Success get all users!'
    })
}

const createNewUser = (req,res)=>{
    res.json({
        message:'Success create new users!',
        data: req.body
    })
}

module.exports = {getAllUsers,createNewUser}