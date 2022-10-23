var mysql      = require('mysql');
     
    var con = mysql.createConnection({
        host     : '10.14.153.194',
        user     : 'icpay',
        password : 'P@ssw0rd2015',
        database : 'icpay'
      });
      
      con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM admin_produk", function (err, result, fields) {
          if (err) throw err;
          console.log(result);
        });
      });
     