const mongoose = require('mongoose')

const User = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    library: [],
    
},
    { collection: 'user-data' }
)

const model = mongoose.model('UserData', User)
module.exports = model