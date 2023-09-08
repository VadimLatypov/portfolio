// Отправка почты
$('#message_send').click(() => {
    let name = $('#contact form input:first-of-type').val();
    let email = $('#contact form input:last-of-type').val();
    let message = $('#contact form textarea').val();
    $.ajax({
        url: '../php/sendPost.php',
        type: 'POST',
        cach: false,
        data: {
            'name': name,
            'email': email,
            'message': message
        },
        dataType: 'html',
        success: function(data) {
            if(data === 'Done') {
                $('#success-block').text('Сообщение успешно отправлено');
                $('#message_send').prop('disabled', true);
                $('#error-block').hide();
                $('#contact form input:first-of-type').val('');
                $('#contact form input:last-of-type').val('');
                $('#contact form textarea').val('');
                setTimeout(() => {
                    $('#message_send').prop('disabled', false);
                    $('#success-block').slideUp('slow');
                }, 3000)
            } else {
                $('#error-block').show();
                $('#error-block').text(data);
            }
        }
    });
});