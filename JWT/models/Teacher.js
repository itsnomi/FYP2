const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcrypt");


const tecaherSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    institute: {
        type : String,
        required: true,
        unique: false
    },
    password: {
        type: String,
        required: true,
    },
    type : {
        type: String,
        required : true
    }
});

tecaherSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

tecaherSchema.statics.login = async function (email, password) {
    const teacher = await this.findOne({ email });

    if (teacher) {
        const auth = await bcrypt.compare(password, teacher.password);
        if (auth) {
            return teacher;
        }
        throw { message: "Invalid password" };
    }
    throw { message: "Invalid Email Address" };
};

module.exports = model("Teacher", tecaherSchema);