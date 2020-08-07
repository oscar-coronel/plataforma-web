//const use = require('./network')

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

            return resolve(fullMessage)

        }
    })
}

module.exports = {
    addMessage
}