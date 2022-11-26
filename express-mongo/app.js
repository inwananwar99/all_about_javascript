const express = require('express')
const app = express()
const contactsRouter = require('./routes/contacts')
const middlewareLogs = require('./middlewares/logs')


app.listen(3000, ()=>{
    console.log('Server berhasil dijalankan di port 3000')
})
app.use(express.json())
app.use(middlewareLogs)
app.use('/contacts',contactsRouter)


