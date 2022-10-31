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

//Third-Party Middleware
app.use(expressLayouts)
app.set('view engine','ejs')
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