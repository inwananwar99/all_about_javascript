//core module
//file system
const fs = require('fs');
const readline = require('readline')
//buat file baru/edit file baru dengan menambahkan string (Synchronous)
// fs.writeFileSync('idpel.csv','123456789101');

//buat file baru/edit file baru dengan menambahkan string (Asynchronous)
// fs.writeFile('idpel.csv','123456789102',(e)=>{
//     console.log(e);
// })

//read isi file (Synchronous)
// const data = fs.readFileSync('idpel.csv','utf-8');
// console.log(data);

//read isi file (Asynchronous)
// const data = fs.readFile('idpel.csv','utf-8',(err,data)=>{
//     if(err) throw err
//     console.log(data)
// })

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//jika belum ada folder data, maka dibuatkan foldernya dan jika belum ada file contacts, maka akan dibuatkan file nya
const dir = './data';
const file = './data/contacts.json';
if(!fs.existsSync(dir)){
  fs.mkdir(dir);
}else if(!fs.existsSync(file)){
   fs.writeFileSync(file,'[]','utf-8');
}

rl.question('Inputkan nama anda : ',(nama)=>{
    rl.question('Inputkan nomor telepon anda :', (nohp)=>{
        const contact = {nama , nohp};
        const file = fs.readFileSync('data/contacts.json','utf8');
        const contacts = JSON.parse(file);
        contacts.push(contact);
        fs.writeFileSync('data/contacts.json',JSON.stringify(contacts));
        console.log('Tengkyu yaa, bakal gua daftarin pinjol nih wkwk');
        rl.close();
    })    
})



