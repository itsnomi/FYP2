const mongoose = require("mongoose");
const { Schema } = mongoose;

const testSchema = Schema({
    testExplanation: {
        type: String,
        required: true,
        unique:false
    },
    hint: {
        type: String,
        required: false,
        unique : false
    },
    sampleCode: {
        type : String,
        required: true,
        unique: false
    },
    filename: {
        type: String,
        required: true,
    },
    extension:{
        type : String,
        required : true
    },
    language : {
        type: String,
        required : true
    }
});

const Test = mongoose.model("Test", testSchema);

module.exports = Test;
