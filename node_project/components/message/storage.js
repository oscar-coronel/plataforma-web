const db = require('mongoose')
const Model = require('./model')

const uri = 'mongodb+srv://ocoronel:lGPH5WgGxY4BvZ5s@cluster0.0sp2y.gcp.mongodb.net/ups?retryWrites=true&w=majority'

db.Promise = global.Promise
db.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //dbName: 'ups'
}).then(() => {
    console.log('[db] Conexión Exitosa')
}).catch(() => {
    console.error('[db] Problemas con la conexión')
})

function addMessage(message) {
    const myMessage = new Model(message)
    myMessage.save()
}

async function getMessages(filterUser) {
    let filter = {}
    if (filterUser != null) {
        filter = {
            user: filterUser
        }
    }
    return await Model.find(filter)
}

async function updateMessage(id, message) {
    const oMessage = await Model.findOne({ _id: id })
    oMessage.message = message
    const newMessage = oMessage.save()
    return newMessage
}

module.exports = {
    add: addMessage,
    list: getMessages,
    update: updateMessage,
}