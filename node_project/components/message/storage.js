
const Model = require('./model')


async function addMessage(message) {
    const myMessage = new Model(message)
    const newMessage = await myMessage.save()
    return newMessage
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

function deleteMessage(id) {
    return Model.deleteOne({
        _id: id
    })
}

module.exports = {
    add: addMessage,
    list: getMessages,
    update: updateMessage,
    delete: deleteMessage,
}