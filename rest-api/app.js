const express = require('express')
const cors = require('cors')
const { urlencoded } = require('express')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const port = 8000
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})