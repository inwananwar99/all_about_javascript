const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/L_ong_ive_earning',
{
    connectTimeoutMS: 1000
}
);
