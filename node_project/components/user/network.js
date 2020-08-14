const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')

const router = express.Router()

router.get('/', function (req, res) {

    const filterUser = req.query.name || null
    controller.getUsers(filterUser).then(usersList => {
        response.success(req, res, usersList, 200)
    }).catch(error => {
        response.error(req, res, 'Error en la lista', 500, error)
    })
})

router.post('/', function (req, res) {

    controller.addUser(req.body.name, req.body.lastname).then((fullUser) => {
        response.success(req, res, fullUser, 201)
    }).catch((error) => {
        response.error(req, res, 'Error simulado', 500, 'Es una simulacion de los errores')
    })

})

module.exports = router