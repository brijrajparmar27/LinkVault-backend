const mongoose = require('mongoose');

const LinkSchema = mongoose.Schema({
    note: {
        require:true,
        type:String
    }
})

module.exports = mongoose.model('link',LinkSchema)