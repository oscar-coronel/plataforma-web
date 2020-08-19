const Model = require('./model')
const UserModel = require('../user/model')


async function addMessage(message) {
    const myMessage = new Model(message)
    const newMessage = await myMessage.save()
    return newMessage
}

function getMessages(filterUser) {
    return new Promise((resolve, reject) => {
        if (filterUser != null) {
            let filter = {
                name: filterUser
            }
            UserModel.find(filter).then(function(userData){
                if (userData.length == 0) {
                    return resolve([])
                }
                Model.find({user: userData[0]._id})
                .populate('user')
                .exec((error, populated) => {
                    if (error) {
                        return reject( error )
                    }
                    return resolve(populated)
                })
            })
            
        } else {
            Model.find()
            .populate('user')
            .exec((error, populated) => {
                if (error) {
                    return reject( error )
                }
                return resolve(populated)
            })
        }   
        
    })

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