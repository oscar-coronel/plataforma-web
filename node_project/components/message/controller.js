//const use = require('./network')
const storage = require('./storage')
const config = require('../../config')

function addMessage(chat, user, message, file) {
    return new Promise(function (resolve, reject) {
        if (!chat || !user || !message) {
            console.log('[Message Controller] No hay usuario o mensaje')
            return reject('Los datos son incorrectos')
        } else {

            let fileUrl = ''
            if (file) {
                fileUrl = config.host + ':' + config.port + config.publicRoute + config.filesRoute + '/' + file.filename
            }

            const fullMessage = {
                chat: chat,
                user: user,
                message: message,
                date: new Date(),
                file: fileUrl
            }
            const result = storage.add(fullMessage)
            return resolve(result)
        }
    })
}

function getMessages(filter_user) {
    return new Promise((resolve, reject) => {
        resolve(storage.list(filter_user))
    })
}

function updateMessage(id, message) {
    return new Promise(async (resolve, reject) => {
        if (!id || !message) {
            return reject('Data Inválida')
        }
        const result = await storage.update(id, message)
        return resolve(result)
    })
}

function deleteMessage(id) {
    return new Promise(async (resolve, reject) => {
        if (!id) {
            return reject('Id Inválida')
        }
        const result = storage.delete(id)
        return resolve(result)
    })
}

module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage,
}