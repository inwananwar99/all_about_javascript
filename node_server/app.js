const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { loadContacts, findContacts, addContact } = require('./utils/contacts')
const app = express();
const port = 3000;
//pakai EJS

//Third-Party Middleware
app.use(expressLayouts)
app.set('view engine','ejs')
subholding = [
    {
        nama:'PLN Indonesia Power',
    },
    {
        nama:'PLN Nusantara Power'
    },
    {
        nama:'PLN Indonesia Primer'
    },
    {
        nama:'PLN Icon Plus'
    }
];

//application middleware
app.use((req,res,next)=>{
    console.log('Time:', Date.now())
    next()
})

//built-in middleware
app.use(express.static('public'))
app.use(express.urlencoded())

app.get('/',(req,res)=>{
    res.render('index',{
        nama :'Yuddy Wicaksono',
        title:'PLN Icon Plus',
        subholding,
        layout:'layouts/main_layouts'
    })
});

app.get('/registrasi',(req,res)=>{
    res.render('register',{
        title:'Registrasi',
        layout:'layouts/main_layouts'
    })
});

app.get('/contact',(req,res)=>{
    const contacts = loadContacts();
    res.render('contact',{
        title:'Contacts',
        layout:'layouts/main_layouts',
        contacts
    })
});

app.get('/contact/add',(req,res)=>{
    res.render('add_contact',{
        title:'Add Contacts',
        layout:'layouts/main_layouts'
    })
});

app.get('/contact/:nama',(req,res)=>{
    const contact = findContacts(req.params.nama);
    res.render('detail',{
        title:'Detail Contacts',
        layout:'layouts/main_layouts',
        contact
    })
});

app.post('/contact',(req,res)=>{
    addContact(req.body)
    res.redirect('/contact')
})

// app.get('/product/:id',(req,res)=>{
//     res.send(`Product ID : ${req.params.id} <br> Category : ${req.query.category}`)
// });

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