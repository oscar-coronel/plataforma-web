
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

module.exports = {
    add: addUser,
    list: getUsers,
}