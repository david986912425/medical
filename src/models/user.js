const { Schema, model, models } = require("mongoose");

const UserSchema = Schema({
    name: {
        type: String,
        required: true
        // required: [true, 'El nombre es obligatorio']
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    online: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: {
            values: ['admin', 'client', 'employee'],
            message: '{VALUE} no es un rol válido',
            default: 'client',
            required: true
        },
    },
})

UserSchema.method('toJSON', function(){
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('User', UserSchema);