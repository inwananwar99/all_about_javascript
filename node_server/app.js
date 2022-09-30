const express = require('express');
const app = express();
const port = 3000;
//pakai EJS
app.set('view engine','ejs')

app.get('/',(req,res)=>{
    res.render('index')
});

app.get('/registrasi',(req,res)=>{
    res.render('register')
});

app.get('/product/:id',(req,res)=>{
    res.send(`Product ID : ${req.params.id} <br> Category : ${req.query.category}`)
});

app.use('/',(req,res)=>{
    res.status(404)
    res.send('Halaman tidak ditemukan')
});


app.listen(port,()=>{
    console.log(`The App is listening on port ${port}`)
})




// const http = require('http')
// const fs = require('fs')
// const renderHTML = (path,res)=>{
//     fs.readFile(path,(err,data)=>{
//         if(err){
//             res.writeHead(404);
//             res.write('Error : File Not Found');
//         }else{
//             res.write(data);
//         }
//         res.end()
//     })
// }
// http
// .createServer((req,res)=>{
//     res.writeHead(200,{
//         'Content-Type':'text/html'
//     });
    
//     const url = req.url;
//     switch (url) {
//         case '/about':
//             renderHTML('./about.html',res);
//         break;
//         case '/register':
//             renderHTML('./register.html',res);
//         break;
    
//         default:
//             renderHTML('./index.html',res);
//             break;
//     }
//     // if(url === '/about'){
//     //     renderHTML('./about.html',res);
//     // }else if(url === '/register'){
//     //     renderHTML('./register.html',res);
//     // }else{
//     //     renderHTML('./index.html',res);
//     // }
// })
// .listen(3000,()=>{
//     console.log('Server telah berhasil dijalankan')
// })