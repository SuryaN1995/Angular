var {
    mongoose
} = require('./mongoose')


let PostSchema = new mongoose.Schema({
    title:{type:String, required:true},
    content:{type:String, required:true}
})

let PostDB = mongoose.model('PostDB',PostSchema)

module.exports = { PostDB }
