'use strict';

var messages_table = $('#messages_table')
var message_form = $('#message_form')

var origin_user_id = $('#origin_user_id')
var destiny_user_id = $('#destiny_user_id')
var message = $('#message')
var file = $('#file')

var protocol = window.location.protocol
var port = window.location.port
var hostname = window.location.hostname

var main_host = `${ protocol }//${ hostname }:${ port }`

getUsers('origin_user_id')
getUsers('destiny_user_id')

message_form.submit(function(event){
    event.preventDefault()

    let formData = new FormData($('#message_form')[0])
    let url = `${ main_host }/message`

    $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        beforeSend: () => {
            $('#send_message').attr('disabled', true)
        },
        dataType: "JSON",
        success: function (data) {
            origin_user_id.val('')
            destiny_user_id.val('')
            message.val('')
            file.val('')
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
            user_name: userName
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

function getUsers(selector) {
    let url = `${ main_host }/user`
    $.ajax({
        url: url,
        type: 'GET',
        dataType: "JSON",
        success: function (data) {
            let select = $('#'+selector)
            select.append(`
            <option value="">
                --SELECCIONAR--
            </option>
            `)
            data.body.forEach(user => {
                select.append(`
                    <option value="${ user.id }">
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
            <td colspan="5" class="text-center">
            No se encontró a un usuario con el nombre ${userName}
            </td>
        </tr>
    ` : ''

    let tbody = messages_table.find('tbody')
    tbody.html(message)
    data.forEach(( element, index ) => {
        let fileUrl = !!element.file.trim() ? `<img class="img-thumbnail" src="./${ element.file }" style="max-height: 100px;" />` : '';
        tbody.append(`
            <tr>
                <td>${ element.origin_user_id.name } ${ element.origin_user_id.lastname }</td>
                <td>${ element.destiny_user_id.name } ${ element.destiny_user_id.lastname }</td>
                <td>${ element.message }</td>
                <td style="text-align: center;">
                     ${ fileUrl }
                </td>
                <td>${ element.date }</td>
            </tr>
        `)
    })
}