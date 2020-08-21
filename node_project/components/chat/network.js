const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')

const router = express.Router()

router.get('/:userId', function (req, res) {
    controller.getChats( req.params.userId ).then(data => {
        response.success(req, res, data, 200)
    }).catch(error => {
        response.error(req, res, '[Error Chat]', 500, error)
    })
})

router.post('/', function (req, res) {

    controller.addChat( req.body.users ).then((data) => {
        response.success(req, res, data, 201)
    }).catch((error) => {
        response.error(req, res, '[Error Chat]', 500, 'Es una simulacion de los errores')
    })

})

module.exports = router