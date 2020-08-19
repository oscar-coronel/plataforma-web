'use strict';

var messages_table = $('#messages_table')
var message_form = $('#message_form')
var user = $('#user')
var message = $('#message')
var protocol = window.location.protocol
var port = window.location.port
var hostname = window.location.hostname

var main_host = `${ protocol }//${ hostname }:${ port }`

getUsers()

message_form.submit(function(event){
    event.preventDefault()

    let url = `${ main_host }/message`

    $.ajax({
        url: url,
        type: 'POST',
        data: {
            user: user.val(),
            message: message.val()
        },
        beforeSend: () => {
            $('#send_message').attr('disabled', true)
        },
        dataType: "JSON",
        success: function (data) {
            user.val('')
            message.val('')
            $('#modal-close').click()
        },
        error: function(data){
            console.log(data.responseText)
        },
        complete: (data) => {
            $('#send_message').attr('disabled', false)
        }
    });
})

function loadingInfo(){
    messages_table.find('tbody').html(`
        <tr>
            <td colspan="3" class="text-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </td>
        </tr>
    `)
}

function getMessages() {
    let url = `${ main_host }/message`
    let userName = $('#search_user').val()
    $.ajax({
        url: url,
        type: 'GET',
        dataType: "JSON",
        data: {
            user: userName
        },
        beforeSend: loadingInfo,
        success: function (data) {
            putData(data.body, userName)
        },
        error: function (data) {
            console.log(data.responseText)
        }
    });
}

function getUsers() {
    let url = `${ main_host }/user`
    $.ajax({
        url: url,
        type: 'GET',
        dataType: "JSON",
        success: function (data) {
            let select = $('#user')
            data.body.forEach(user => {
                select.append(`
                    <option value="${ user._id }">
                        ${ user.name } ${ user.lastname }
                    </option>
                `)
            })
        },
        error: function (data) {
            console.log(data.responseText)
        }
    });
}

function putData(data, userName){
    let message = data.length == 0 ? `
        <tr>
            <td colspan="3" class="text-center">
            No se encontró a un usuario con el nombre ${userName}
            </td>
        </tr>
    ` : ''

    let tbody = messages_table.find('tbody')
    tbody.html(message)
    data.forEach(( element, index ) => {
        tbody.append(`
            <tr>
                <td>${ element.user.name } ${ element.user.lastname }</td>
                <td>${ element.message }</td>
                <td>${ element.date }</td>
            </tr>
        `)
    })
}