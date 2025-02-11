const {Schema,model} = require("mongoose")

const blogSchema = new Schema({
    title : {
        type: String,
        required : true,
    },
    body : {
        type: String,
        required : true,
    },
    coverImage : {
        type: String,
        required: false,
    },
    createdBy: {
        //store the creators mongoDB id
        type: Schema.Types.ObjectId,
        ref:"user" //it is referencing to user collections
    }
},{
    timestamps: true,
})

const Blog = model('blog', blogSchema);

module.exports = Blog