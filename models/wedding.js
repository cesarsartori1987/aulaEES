var mongoose = require('mongoose')

var Schema = mongoose.Schema

var InitialFormSchema = new Schema({
    casal: {
        noivo: {
            nome :{
                type: String,
                required: true
            },
            idade: {
                type: Number,
                required: true
            },
            genero: {
                type: String,
                required: true
            }
        }
        ,noiva: {
            nome :{
                type: String,
                required: true
            },
            idade: {
                type: Number,
                required: true
            },
            genero: {
                type: String,
                required: true
            }
        }
    },
    local: {
        cidade: {
            type: String,
            required: true
        },
        estado: {
            type: String,
            required: true
        }
    },
    contato: {
        nomeContato: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        telefone: {
            type: String,
            required: false
        }
    },
    data: {
        diaCasamento: {
            type: Number,
            required: false
        },
        mesCasamento: {
            type:Number,
            required: true
        },
        anoCasamento: {
            type:Number,
            required: true
        },
        periodoCasamento: {
            type: String,
            required: false
        }   
    },
    insert: {
        type: Date,
        required: true
    },
    update: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('InitialForm', InitialFormSchema)