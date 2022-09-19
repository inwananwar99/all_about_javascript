const fs = require('fs');
const validator = require('validator')

//jika belum ada folder data, maka dibuatkan foldernya dan jika belum ada file contacts, maka akan dibuatkan file nya
const dir = './data';
const file = './data/contacts.json';
if(!fs.existsSync(dir)){
  fs.mkdirSync(dir);
}

if(!fs.existsSync(file)){
   fs.writeFileSync(file,'[]','utf-8');
}


const simpanContact = (nama,email,nohp) => {
    const contact = {nama , email, nohp };
    const file = fs.readFileSync('data/contacts.json','utf8');
    const contacts = JSON.parse(file);
    //validasi duplikat
    const duplicate = contacts.find((contact)=>contact.nama === nama);
    if(duplicate){
        console.log('Kontak sudah tersimpan, silahkan isi kontak yang lain');
        return false;
    }

    //validasi email 
    if(email){
        if(!validator.isEmail(email)){
            console.log('Email tidak valid, silahkan isi dengan email yang benar!');
            return false;
        }
    }

        //validasi no handphone 
        if(email){
            if(!validator.isMobilePhone(nohp,'id-ID')){
                console.log('Silahkan input nomor handphone Indonesia');
                return false;
            }
        }

    contacts.push(contact);
    fs.writeFileSync('data/contacts.json',JSON.stringify(contacts));
    console.log('Tengkyu yaa, bakal gua daftarin pinjol nih wkwk');
}

module.exports = { simpanContact }