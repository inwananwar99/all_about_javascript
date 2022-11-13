const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const {body, validationResult, check} = require('express-validator')
const port = 3000

require('./utils/db.js')
const Contact = require('./model/contact.js')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const methodOverride = require('method-override')

//Third-Party Middleware
app.use(expressLayouts)
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

app.use(cookieParser('secret'))
app.use(session({
    cookie:{maxAge:6000},
    secret:'secret',
    resave:true,
    saveUninitialized:true
}))
app.use(flash())

app.listen(port,()=>{
    console.log(`Contact App With Mongo DB | On Port ${port}`)
})

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
})

app.get('/registrasi',(req,res)=>{
    res.render('register',{
        title:'Registrasi',
        layout:'layouts/main_layouts'
    })
});

//halaman kontak
app.get('/contact', async(req,res)=>{
    const contacts = await Contact.find();
    res.render('contact',{
        title:'Contacts',
        layout:'layouts/main_layouts',
        contacts,
        msg:req.flash('msg')
    })
});

//halaman add kontak
app.get('/contact/add',(req,res)=>{
    res.render('add_contact',{
        title:'Form Tambah Data Kontak',
        layout:'layouts/main_layouts'
    })
})


//tambah data kontak
//tambah kontak
app.post('/contact',[
    //validasi email
    check('email','Alamat Email tidak tepat! Silahkan isi dengan tepat!').isEmail(),
    //validasi nama
    body('nama').custom( async (value)=>{
        const duplikatNama = await Contact.findOne({nama:value});
        if(duplikatNama){
            throw new Error('Nama Kontak Sudah terdaftar!')
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
        Contact.insertMany(req.body,(error,result)=>{
            req.flash('msg','Data berhasil ditambahkan!')
            res.redirect('/contact')
        })
    }
})


//detail kontak
app.get('/contact/:nama', async (req,res)=>{
    const contact = await Contact.findOne({nama:req.params.nama});
    res.render('detail',{
        title:'Detail Contacts',
        layout:'layouts/main_layouts',
        contact
    })
});

//edit kontak
app.get('/contact/edit/:nama', async(req,res)=>{
    const getData = await Contact.findOne({nama:req.params.nama});
    res.render('edit_contact',{
        title:'Edit Contact',
        layout:'layouts/main_layouts',
        dataOld:getData
    })
})

//proses update kontak
app.put('/contact',[
    //validasi email
    check('email','Alamat Email tidak tepat! Silahkan isi dengan tepat!').isEmail(),
    //validasi nama
    body('nama').custom( async (value,{req})=>{
        const duplikatNama = await Contact.findOne({nama:value});
        if(value !== req.body.oldNama && duplikatNama){
            throw new Error('Nama Kontak Sudah terdaftar!')
        }
        return true
    })
    //validasi no hp
    // body('nohp').custom((value)=>{
    //     const duplikatNomor = cekDuplikatNomor(value);
    //     if(duplikatNomor){
    //         throw new Error('Nomor Sudah terdaftar!')
    //     }
    //     return true
    // })
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
        Contact.updateOne(
            {_id:req.body._id},
            {
                $set:{
                    nama:req.body.nama,
                    email:req.body.email,
                    nohp:req.body.nohp
                }
            }
        ).then((result) => {
                req.flash('msg','Data berhasil diubah!')
                res.redirect('/contact')
        })
    }
})



//hapus kontak
// app.get('/contact/delete/:nama', async (req,res)=>{
//     const find = await Contact.findOne({nama:req.params.nama});
//     if(!find){
//         res.status(404)
//         res.send('<h1>404</h1>')
//     }else{
//         Contact.deleteOne({_id :find._id}).then(()=>{
//             req.flash('msg','Data berhasil dihapus!')
//             res.redirect('/contact')
//         })
//     }

// })

app.delete('/contact',(req,res)=>{
    Contact.deleteOne({id :req.body._id}).then(()=>{
    req.flash('msg','Data berhasil dihapus!')
    res.redirect('/contact')
    })
})