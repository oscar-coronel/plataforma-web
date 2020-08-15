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

function updateUser(id, name, lastname) {
    return new Promise(async (resolve, reject) => {
        if (!id || !name || !lastname) {
            return reject('Data Inválida')
        }
        const result = await storage.update(id, name, lastname)
        return resolve(result)
    })
}

function deleteUser(id) {
    return new Promise(async (resolve, reject) => {
        if (!id) {
            return reject('Id Inválida')
        }
        const result = storage.delete(id)
        return resolve(result)
    })
}


module.exports = {
    addUser,
    getUsers,
    updateUser,
    deleteUser,
}