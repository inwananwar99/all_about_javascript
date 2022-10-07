const fs = require('fs');
// const validator = require('validator')

//jika belum ada folder data, maka dibuatkan foldernya dan jika belum ada file contacts, maka akan dibuatkan file nya
const dir = './data';
const file = './data/contacts.json';
if(!fs.existsSync(dir)){
  fs.mkdirSync(dir);
}

if(!fs.existsSync(file)){
   fs.writeFileSync(file,'[]','utf-8');
}

const loadContacts = ()=>{
    const file = fs.readFileSync('data/contacts.json','utf8');
    const contacts = JSON.parse(file);
    return contacts;
}

module.exports = { loadContacts }