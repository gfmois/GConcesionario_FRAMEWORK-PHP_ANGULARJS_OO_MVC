app.factory('contactServices', ['services', '$rootScope', 'toastr', (services, $rootScope, toastr) => {
    let service = { sendContactMessage: sendContactMessage };
    return service;

    function sendContactMessage(name, email, theme, text) {
        services.post('contact', 'sendContactMessage', {
            name: name,
            email: email, 
            theme: theme,
            text: text
        }).then((response) => {
            if (response.result.code != 200) toastr.error('Hubo un error al mandar el mensaje, intentelo mas tarde porfavor.');
            else toastr.success('Mensaje enviado correctamente, nos pondremos en contacto con usted.')

            location.href = "#/home"
            window.location.reload()
            return;
        }, (err) => {
            console.log(err);
        })
    }
}])

