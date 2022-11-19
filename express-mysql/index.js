const express = require('express')
const app = express()
const usersRouter = require('./routes/users')
const middlewareLogs = require('./middlewares/logs')

app.listen(3000, ()=>{
    console.log('Server berhasil dijalankan di port 3000')
})


app.use(express.json())
app.use(middlewareLogs)
app.use('/users',usersRouter)

// app.get('/', (req,res)=>{
//     res.send('Halo ini server pertama mu!!!');
// })