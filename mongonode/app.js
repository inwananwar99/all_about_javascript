const {MongoClient, ObjectId} = require("mongodb")

const uri = "mongodb://127.0.0.1:27017"
const dbName = "L_ong_ive_earning"

const client = new MongoClient(uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

client.connect((err,client)=>{
    if(err){
        return console.log('Gagal koneksi ke Mongo Local')
    }

    console.log('Berhasil terkoneksi ke Mongo')
    const db = client.db(dbName);
    //== Single Insert Data ==
    // db.collection('nama').insertOne(
    //     {
    //         nama:"Inwan",
    //         email:"inwan.solihudin@iconpln.co.id"
    //     },
    //     (err,result)=>{
    //         if(err){
    //             return console.log('Gagal insert data ke database')
    //         }
    //         console.log(result)
    //     }
    // )

    //== Multiple Insert Data ==
    // db.collection('nama').insertMany(
    //     [
    //         {
    //             nama:"Rahmi",
    //             email:"rahmi@iconpln.co.id"
    //         },
    //         {
    //             nama:"Rahmawati",
    //             email:"rahmawati@iconpln.co.id"
    //         },
    //     ],
    //     (err,result)=>{
    //         if(err){
    //             return console.log('Gagal insert data ke database')
    //         }
    //         console.log(result)
    //     }
    // )

    db.collection('nama').find().toArray((err,result)=>{
        console.log(result);
    })

    // db.collection('nama').updateOne(
    //     {_id:ObjectId('6352ac18f407ff57ce97227d')},
    //     {
    //         $set:{
    //             nama:'Inwan Anwar'
    //         }
    //     }      
    // ).then((result)=>{
    //     console.log(result)
    // }).catch((err)=>{
    //     console.log(err)
    // })

    // db.collection('nama').deleteOne(
    //     {_id:ObjectId('6352ac18f407ff57ce97227d')}
    // ).then((result)=>{
    //     console.log(result)
    // }).catch((err)=>{
    //     console.log(err)
    // })
})