const pool = require('../config/database')

const getAllUsers = () =>{
    const query = 'SELECT *FROM users'
    return pool.execute(query)  
} 

const createNewUser = (body) => {
    const query = `INSERT INTO users (nama,alamat) VALUES ('${body.nama}','${body.alamat}')`
    return pool.execute(query)  
}

const updateUser = (body,userId) => {
    const query = `UPDATE users SET alamat = '${body.alamat}' WHERE id=${userId}`
    return pool.execute(query)  
}

const deleteUser = (userId) => {
    const query = `DELETE FROM users WHERE id=${userId}`
    return pool.execute(query)
}

module.exports = {getAllUsers,createNewUser,updateUser,deleteUser}