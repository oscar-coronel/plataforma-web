const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')

const router = express.Router()

router.get('/', function (req, res) {

    const filterMessage = req.query.user || null

    controller.getMessages(filterMessage).then(messagesList => {
        response.success(req, res, messagesList, 200)
    }).catch(error => {
        response.error(req, res, 'Error en la lista', 500, error)
    })
})

router.post('/', function (req, res) {

    controller.addMessage(req.body.user, req.body.message).then((fullMessage) => {
        response.success(req, res, fullMessage, 201)
    }).catch((error) => {
        response.error(req, res, 'Error simulado', 500, 'Es una simulacion de los errores')
    })

})

router.patch('/:id', function (req, res) {
    controller.updateMessage(req.params.id, req.body.message).then(result => {
        response.success(req, res, result, 200)
    }).catch(error => {
        response.error(req, res, 'Error interno', 500, 'Detalle de error')
    })
})

router.delete('/:id', function (req, res) {
    controller.deleteMessage(req.params.id).then(result => {
        response.success(req, res, result, 200)
    }).catch(error => {
        response.error(req, res, 'Error interno', 500, 'Detalle de error')
    })
})

router.delete('/', function (req, res) {
    response.success(req, res, 'Hola Delete')
})

module.exports = router