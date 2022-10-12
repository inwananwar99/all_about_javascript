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

//ambil data kontak
const loadContacts = ()=>{
    const file = fs.readFileSync('data/contacts.json','utf8');
    const contacts = JSON.parse(file);
    return contacts;
}

//cari kontak berdasarkan nama
const findContacts = (nama) =>{
  const contacts = loadContacts();
  const contact = contacts.find((contact)=>contact.nama.toLowerCase() === nama.toLowerCase());
  return contact;
}

//simpan kontak ke file json
const saveContact = (contacts)=>{
  fs.writeFileSync('./data/contacts.json',JSON.stringify(contacts))
}

//tambah kontak
const addContact = (contact)=>{
  const contacts = loadContacts();
  contacts.push(contact);
  saveContact(contacts);
}

//cek duplikat nama
const cekDuplikatNama = (nama)=>{
  const contacts = loadContacts();
  return contacts.find((contact)=>contact.nama == nama)
}

//cek duplikat nomor
const cekDuplikatNomor = (kontak)=>{
  const contacts = loadContacts();
  return contacts.find((contact)=>contact.nohp == kontak)
}

//delete kontak
const deleteContact = (nama)=>{
  const contacts = loadContacts();
  const newContact = contacts.filter((contact)=> contact.nama.toLowerCase() !== nama.toLowerCase());
  saveContact(newContact)
}

module.exports = { loadContacts, findContacts, addContact, cekDuplikatNama, cekDuplikatNomor, deleteContact }