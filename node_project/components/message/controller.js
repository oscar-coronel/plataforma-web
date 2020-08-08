//const use = require('./network')
const storage = require('./storage')
const { response } = require('express')

function addMessage(user, message) {
    return new Promise(function (resolve, reject) {
        if (!user || !message) {
            console.log('[Message Controller] No hay usuario o mensaje')
            return reject('Los datos son incorrectos')
        } else {
            const fullMessage = {
                user: user,
                message: message,
                date: new Date()
            }

            storage.add(fullMessage)

            return resolve(fullMessage)

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

module.exports = {
    addMessage,
    getMessages,
    updateMessage,
}