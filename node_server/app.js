const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { loadContacts, findContacts, addContact, cekDuplikatNama, cekDuplikatNomor, deleteContact, getDataByName } = require('./utils/contacts')
const {body,validationResult, check} = require('express-validator')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const app = express();
const port = 3000;
//pakai EJS

//Third-Party Middleware
app.use(expressLayouts)
app.set('view engine','ejs')

//application middleware
app.use((req,res,next)=>{
    console.log('Time:', Date.now())
    next()
})

//built-in middleware
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser('secret'))
app.use(session({
    cookie:{maxAge:6000},
    secret:'secret',
    resave:true,
    saveUninitialized:true
}))
app.use(flash())

app.get('/',(req,res)=>{
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
        contacts,
        msg:req.flash('msg')
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

//tambah kontak
app.post('/contact',[
    //validasi email
    check('email','Alamat Email tidak tepat! Silahkan isi dengan tepat!').isEmail(),
    //validasi nama
    body('nama').custom((value)=>{
        const duplikatNama = cekDuplikatNama(value);
        if(duplikatNama){
            throw new Error('Nama Kontak Sudah terdaftar!')
        }
        return true
    }),
    //validasi no hp
    body('nohp').custom((value)=>{
        const duplikatNomor = cekDuplikatNomor(value);
        if(duplikatNomor){
            throw new Error('Nomor Sudah terdaftar!')
        }
        return true
    })
],(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('add_contact',{
        title:'Add Contact',
        layout:'layouts/main_layouts',
        errors:errors.array()
      })
    }else{
        addContact(req.body)
        req.flash('msg','Data berhasil ditambahkan!')
        res.redirect('/contact')
    }
})
//edit kontak
app.get('/contact/edit/:nama',(req,res)=>{
    const getData = getDataByName(req.params.nama);
    res.render('edit_contact',{
        title:'Edit Contact',
        layout:'layouts/main_layouts',
        dataOld:getData[0]
    })
})

//proses update kontak
app.post('/contact/update',[
    //validasi email
    check('email','Alamat Email tidak tepat! Silahkan isi dengan tepat!').isEmail(),
    //validasi nama
    body('nama').custom((value)=>{
        const duplikatNama = cekDuplikatNama(value);
        if(duplikatNama){
            throw new Error('Nama Kontak Sudah terdaftar!')
        }
        return true
    }),
    //validasi no hp
    body('nohp').custom((value)=>{
        const duplikatNomor = cekDuplikatNomor(value);
        if(duplikatNomor){
            throw new Error('Nomor Sudah terdaftar!')
        }
        return true
    })
],(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('edit_contact',{
        title:'Edit Contact',
        layout:'layouts/main_layouts',
        errors:errors.array(),
        contact:req.body
      })
    }else{
        // addContact(req.body)
        // req.flash('msg','Data berhasil diubah!')
        // res.redirect('/contact')
    }
})


//hapus kontak
app.get('/contact/delete/:nama',(req,res)=>{
    const find = findContacts(req.params.nama);
    if(!find){
        res.status(404)
        res.send('<h1>404</h1>')
    }else{
        deleteContact(req.params.nama)
        req.flash('msg','Data berhasil dihapus!')
        res.redirect('/contact')
    }

})


app.use('/',(req,res)=>{
    res.status(404)
    res.send('Halaman tidak ditemukan')
});


app.listen(port,()=>{
    console.log(`The App is listening on port ${port}`)
})


// app.get('/product/:id',(req,res)=>{
//     res.send(`Product ID : ${req.params.id} <br> Category : ${req.query.category}`)
// });


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