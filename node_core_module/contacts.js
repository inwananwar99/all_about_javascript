const fs = require('fs');
const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//jika belum ada folder data, maka dibuatkan foldernya dan jika belum ada file contacts, maka akan dibuatkan file nya
const dir = './data';
const file = './data/contacts.json';
if(!fs.existsSync(dir)){
  fs.mkdirSync(dir);
}

if(!fs.existsSync(file)){
   fs.writeFileSync(file,'[]','utf-8');
}



const tulisPertanyaan = (pertanyaan) =>{
    return new Promise((resolve,rejects)=>{
        rl.question(pertanyaan,(nama)=>{
            resolve(nama);
        });
    });
}

const simpanContact = (nama,nohp) => {
    const contact = {nama , nohp};
    const file = fs.readFileSync('data/contacts.json','utf8');
    const contacts = JSON.parse(file);
    contacts.push(contact);
    fs.writeFileSync('data/contacts.json',JSON.stringify(contacts));
    console.log('Tengkyu yaa, bakal gua daftarin pinjol nih wkwk');
    rl.close();
}

module.exports = { tulisPertanyaan, simpanContact }