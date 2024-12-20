
$('#sumbit-tels').on('click', event => {
const from = $('#from-language').val()
const to = $('#to-language').val()
const text = $('.input').val()
csrf_token = $('#csrf').val()
console.log(from, to, text, csrf_token);

$.ajax({
    url: '/translate/',
    type: 'POST',
    data: {
        from: from,
        to: to,
        text: text,
        csrfmiddlewaretoken: csrf_token
    },
    success: function (data) {
        $('.output').val(data.output)
    }
})

})
