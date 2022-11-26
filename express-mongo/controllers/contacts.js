require('../config/database')
const contactModel = require('../models/contact')
const getAllContacts = async(req,res)=>{
    try {
        const data = await contactModel.find() 
        res.json({
            message:'Success get all contacts!',
            data: data
        })
        console.log(data)
    } catch (error) {
        res.json({
            message:'Gagal terhubung ke server!'
        })
    }
}

const createNewContact = (req,res)=>{
    try {
        contactModel.insertMany(req.body)
        res.json({
            message:'Success add new contact!',
            data: req.body
        })
    } catch (error) {
        res.json({
            message:'Gagal terhubung ke server!',
            serverMessage:error
        })
    }
}

const updateContact = async(req,res)=>{
    try {
        await contactModel.updateOne(
            {_id:req.params.contactId},
            {
                $set:{
                    nama:req.body.nama,
                    email:req.body.email,
                    nohp:req.body.nohp
                }
            }
        ) 
        res.json({
            message:`Success update contact! with id ${req.params.contactId}`,
            data: req.body
        })
    } catch (error) {
        res.json({
            message:'Gagal terhubung ke server!',
            serverMessage:error
        })
    }
}

const deleteContact = async(req,res)=>{
    const id = {contactId:req.params.contactId}
    try {
        await contactModel.deleteOne(id)
        res.json({
            message:`Berhasil menghapus data contact dengan id ${req.params.contactId}`
        })
    } catch (error) {
        res.json({
            message:`Gagal menghapus data contact dengan id ${req.params.contactId}`,
            serverMessage:error
        })
    }
}
module.exports = {getAllContacts,createNewContact,updateContact,deleteContact}