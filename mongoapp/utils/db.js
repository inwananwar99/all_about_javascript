const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/L_ong_ive_earning',
{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}
);

//Schema Tabel
// const Contact = mongoose.model('Contact',{
//     nama:{
//         type:String,
//         required:true
//     },    
//     nohp:{
//         type:String,
//         required:true
//     },
//     email:{
//         type:String,
//     }
// })

//Menambahkan 1 data 
// const contact1 = new Contact({
//     nama:'Inwan Anwar Solihudin',
//     nohp:'086725240967',
//     email:'inwan.solihudin@iconpln.co.id'
// })

// contact1.save().then((contact)=>console.log(contact));