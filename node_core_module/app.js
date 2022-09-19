//core module
//file system
const yargs = require('yargs');
const contacts = require('./contacts')

yargs.command(
    {
        command: 'add',
        describe: 'Menambahkan kontak baru',
        builder: {
            nama : {
                describe: "Nama Lengkap",
                demandOption: true,
                type: 'string'
            },
            email : {
                describe: "Alamat Email",
                demandOption: false,
                type: 'string'
            },
            noHp : {
                describe: "Nomor Handphone",
                demandOption: true,
                type: 'string'
            },
        },
        handler(argv){
          contacts.simpanContact(argv.nama,argv.email,argv.noHp);
        }
    });

yargs.parse();










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


// const main = async() =>{
//     const nama = await tulisPertanyaan('Inputkan nama anda : ');
//     const nohp = await tulisPertanyaan('Inputkan nomor handphone anda : ');
//     simpanContact(nama,nohp);
// }

// main();

// rl.question('Inputkan nama anda : ',(nama)=>{
//     rl.question('Inputkan nomor telepon anda :', (nohp)=>{
//         const contact = {nama , nohp};
//         const file = fs.readFileSync('data/contacts.json','utf8');
//         const contacts = JSON.parse(file);
//         contacts.push(contact);
//         fs.writeFileSync('data/contacts.json',JSON.stringify(contacts));
//         console.log('Tengkyu yaa, bakal gua daftarin pinjol nih wkwk');
//         rl.close();
//     })    
// })



