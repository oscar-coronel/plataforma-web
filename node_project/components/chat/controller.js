const storage = require('./storage')

function addChat( users ){
    return new Promise((resolve, reject) => {
        if (!users || !Array.isArray(users) ) {
            return reject('Objeto inválido')      
        }
        const fullChat = {
            users: users
        }
        storage.add(fullChat)
        return resolve(fullChat)
    })
}

function getChats( userId ){
    return storage.get( userId )
}

module.exports = {
    addChat,
    getChats,
}