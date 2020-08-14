//const use = require('./network')
const storage = require('./storage')

function addUser(name, lastname) {
    return new Promise(function (resolve, reject) {
        if (!name || !lastname) {
            console.log('[Message Controller] No hay usuario o mensaje')
            return reject('Los datos son incorrectos')
        } else {
            const fullUser = {
                name: name,
                lastname: lastname,
            }
            const result = storage.add(fullUser)
            return resolve(result)
        }
    })
}

function getUsers(filter_name) {
    return new Promise((resolve, reject) => {
        resolve(storage.list(filter_name))
    })
}


module.exports = {
    addUser,
    getUsers,
}