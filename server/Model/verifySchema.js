
const mongoose = require('mongoose');




const verifySchema = new mongoose.Schema({
    image:{
        type: String,
    },

    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        // required: true
    }
})


const Verify = mongoose.model('verify', verifySchema);

module.exports = Verify;