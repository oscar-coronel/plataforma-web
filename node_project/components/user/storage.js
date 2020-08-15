
const Model = require('./model')


async function addUser(user) {
    const myUser = new Model(user)
    const newUser = await myUser.save()
    return newUser
}

async function getUsers(filterName) {
    let filter = {}
    if (filterName != null) {
        filter = {
            name: filterName
        }
    }
    return await Model.find(filter)
}

async function updateUser(id, name, lastname) {
    const oUser = await Model.findOne({ _id: id })
    oUser.name = name
    oUser.lastname = lastname
    const newUser = oUser.save()
    return newUser
}

function deleteUser(id) {
    return Model.deleteOne({
        _id: id
    })
}

module.exports = {
    add: addUser,
    list: getUsers,
    update: updateUser,
    delete: deleteUser,
}