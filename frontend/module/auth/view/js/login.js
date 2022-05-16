import { clock } from './clock.js'

function validateLoginForm() {
    let loginForm = document.getElementById('lForm')
    let username = document.getElementById('username')
    let password = document.getElementById('password')
    let loginBtn = document.getElementById('loginBtn')
    let error = document.createElement('div')

    error.id = "error"

    if (username.value.length == 0 && password.value.length != 0) {
        if (document.getElementById('error')) document.getElementById('error').remove()
        error.appendChild(document.createTextNode('Usuario vacío.'))
    } else if (password.value.length == 0 && username.value.length != 0) {
        if (document.getElementById('error')) document.getElementById('error').remove()
        error.appendChild(document.createTextNode('Contraseña vacia.'))
    } else if (username.value.length == 0 && password.value.length == 0) {
        if (document.getElementById('error')) document.getElementById('error').remove()
        error.appendChild(document.createTextNode('Rellene primero los campos.'))
    } else if (username.value.length != 0 && password.value.length != 0) {
        if (document.getElementById('error')) document.getElementById('error').remove()

        login()
    }

    loginForm.insertBefore(error, document.getElementById('errorBrLogin'))

}

async function login(userInfo = $('#lForm').serializeObject()) {
    const verificated = await isVerificated(userInfo);


    if (verificated) {
        ajaxPromise('POST', friendlyURL('?page=auth&op=login'), 'json', userInfo).then((response) => {
            if (response.result) {
                let logForm = document.getElementById('lForm')
                let errorMessage = document.getElementById('error')

                errorMessage.appendChild(document.createTextNode(response.result.message))

                logForm.insertBefore(errorMessage, document.getElementById('errorBrLogin'))
            } else {
                localStorage.setItem('token', response)
                clock()
                pausedPromise(1000).then(() => {
                    window.location.href = friendlyURL('?page=home');
                })
            }
        })
    } else {
        let logForm = document.getElementById('lForm')
        let errorMessage = document.getElementById('error')

        errorMessage.appendChild(document.createTextNode("Porfavor revise su correo"))

        logForm.insertBefore(errorMessage, document.getElementById('errorBrLogin'))
    }
}


async function isVerificated(userInfo) {
    let isValid = false;
    await ajaxPromise('POST', friendlyURL('?page=auth&op=isVerificated'), 'json', userInfo).then((response) => {
        if (response.result.code == 1) {
            isValid = true;
        }
    });

    return isValid;
}

export { validateLoginForm, login }