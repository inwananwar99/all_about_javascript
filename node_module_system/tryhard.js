console.log('Hello World');
function cetakNama(nama){
    return `Hi nama saya ${nama}`;
}

const namaku = 'Inwan';
const trying = {
    subjek : 'Aku',
    predikat : 'Suka Belajar',
    objek(){
        return `${this.subjek} ${this.predikat} hal yang baru`
    }
}

class Manusia {
    constructor(){
        console.log('Membuat objek baru untuk fitur Kendali Pengaduan');
    }
}

// module.exports.namaku = namaku;
// module.exports.trying = trying;
// module.exports.cetakNama = cetakNama;
// module.exports.human = Manusia; 
//sintaks ES 6
module.exports = { cetakNama, namaku, trying, Manusia };