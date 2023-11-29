

const mongoose = require('mongoose');


const widthdrawSchema = new mongoose.Schema({
    bankName: {
        type: String,
        default: "input your bank name"
    },

    AccountName: {
        type: String,
        default: "your account name"
    },

    AccountNumb: {
        type: String,
        default: "0XXXXXXXXXXX"
    },
    // wallet: {
    //     type: String,
    //     default: "jdhfhgfhgkfsgkfashgkfsgfsbgfsgbsgsgg",
    //     required:false
    // },
    amount: {
        type: String,
        
    },

    status: {
        type: String,
        default: 'pending'
    },

    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        // required: true
    }
}, {timestamps: true});

const Widthdraw = mongoose.model('widthdraw', widthdrawSchema);

module.exports = Widthdraw;