'use strict';

var messages_table = $('#messages_table')
var message_form = $('#message_form')
var user = $('#user')
var message = $('#message')
var protocol = window.location.protocol
var port = window.location.port
var hostname = window.location.hostname

var main_host = `${ protocol }//${ hostname }:${ port }`

getMessages()

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
        dataType: "JSON",
        success: function (data) {
            console.log(data)
            user.val('')
            message.val('')
            $('#modal-close').click()
            getMessages()
        },
        error: function(data){
            console.log(data.responseText)
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
    $.ajax({
        url: url,
        type: 'GET',
        dataType: "JSON",
        beforeSend: loadingInfo,
        success: function (data) {
            putData(data.body)
        },
        error: function (data) {
            console.log(data.responseText)
        }
    });
}

function putData(data){
    let tbody = messages_table.find('tbody')
    tbody.empty()
    data.forEach(( element, index ) => {
        tbody.append(`
            <tr>
                <td>${ element.user }</td>
                <td>${ element.message }</td>
                <td>${ element.date }</td>
            </tr>
        `)
    })
}