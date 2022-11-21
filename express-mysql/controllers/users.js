const usersModel = require('../models/users')
const getAllUsers = async (req,res)=>{
    try {
        const [data] = await usersModel.getAllUsers() 
        res.json({
            message:'Success get all users!',
            data: data
        })
    } catch (error) {
        res.json({
            message:'Gagal terhubung ke server!'
        })
    }
}

const createNewUser = async (req,res)=>{
    const {body} = req
    try {
        await usersModel.createNewUser(body)
        res.json({
            message:'Success create new users!',
            data: body
        })
    } catch (error) {
        res.json({
            message:'Failed to save data!',
            serverMessage: error
        })
    }
}

const updateUser = async(req,res)=>{
    const {userId} = req.params
    const {body} = req
    try {
        await usersModel.updateUser(body,userId)
        res.json({
            message:'Success update user',
            data:{
                id:userId,
                ...body
            }
        })
    } catch (error) {
        res.json({
            message:'Failed update user',
            serverMessage:error
        }) 
    }
}

const deleteUser = async(req,res)=>{
    const {userId} = req.params
    try {
        await usersModel.deleteUser(userId)
        res.json({
            message:`Berhasil menghapus data user dengan id ${userId}`
        })
    } catch (error) {
        res.json({
            message:`Gagal menghapus data user dengan id ${userId}`,
            serverMessage:error
        })
    }
}
module.exports = {getAllUsers,createNewUser,updateUser,deleteUser}