import { validateLoginForm } from './login.js'
import { validateRegisterForm } from './register.js'

let userProfile;

function loadForm() {
    let classNames = ["githubCl", "gmailCl"]
    let topContainer = document.createElement('div')

    topContainer.className = "authContainer"
    topContainer.id = "authContainer"

    // Create Account
    let registerFormContainer = document.createElement('div')
    let registerForm = document.createElement('form')
    let createTitle = document.createElement('h1')
    let createUsername = document.createElement('input')
    let createPassword = document.createElement('input')
    let createPasswordConfirm = document.createElement('input')
    let createEmail = document.createElement('input')
    let createButton = document.createElement('input')
    let errorBr = document.createElement('br')
    let registerSocial = document.createElement('div')

    let registerWithIcons = ["fab fa-brands fa-github", "fab fa-google-plus-g"]

    registerWithIcons.forEach((value, index) => {
        let socialA = document.createElement('a')
        let socialIcon = document.createElement('i')

        socialA.className = "social " + classNames[index]
        socialIcon.className = registerWithIcons[index]
        socialA.href = "#"
        socialA.style.textDecoration = "none"

        socialA.appendChild(socialIcon)
        registerSocial.appendChild(socialA)
    })

    registerFormContainer.className = "form-container sign-up-container"
    registerSocial.className = "social-container"
    registerForm.setAttribute('autocomplete', 'off')
    registerForm.className = "authForm"
    errorBr.id = "errorBr"
    registerForm.id = "rForm"
    createButton.value = "Crear Cuenta"
    createButton.type = "button"
    createButton.id = "registerBtn"
    createUsername.type = "text"
    createUsername.className = "authInput"
    createPassword.className = "authInput"
    createPasswordConfirm.className = "authInput"
    createEmail.className = "authInput"
    createEmail.type = "email"
    createPassword.type = "password"
    createPasswordConfirm.type = "password"
    createUsername.placeholder = "Usuario "
    createEmail.placeholder = "Email "
    createPassword.placeholder = "Contraseña "
    createPasswordConfirm.placeholder = "Repetir Contraseña "

    createUsername.name = "username"
    createPassword.name = "password"
    createPasswordConfirm.name = "password_confirm"
    createEmail.name = "email"

    createTitle.appendChild(document.createTextNode('Crear Cuenta'))

    registerForm.appendChild(createTitle)
    registerForm.appendChild(registerSocial)
    registerForm.appendChild(document.createElement('br'))
    registerForm.appendChild(createUsername)
    registerForm.appendChild(createEmail)
    registerForm.appendChild(createPassword)
    registerForm.appendChild(createPasswordConfirm)
    registerForm.appendChild(errorBr)
    registerForm.appendChild(createButton)

    registerFormContainer.appendChild(registerForm)
    topContainer.appendChild(registerFormContainer)

    // Sign In
    let loginFormContainer = document.createElement('div')
    let loginForm = document.createElement('form')
    let loginTitle = document.createElement('h1')
    let loginSocialContainer = document.createElement('div')
    let loginUsername = document.createElement('input')
    let loginPassword = document.createElement('input')
    let loginBtn = document.createElement('input')
    let errorLogbr = document.createElement('br')

    let socialSignInIcons = ["fab fa-brands fa-github", "fab fa-google-plus-g"]

    socialSignInIcons.forEach((value, index) => {
        let socialA = document.createElement('a')
        let socialIcon = document.createElement('i')

        socialA.className = "social " + classNames[index]
        socialIcon.className = socialSignInIcons[index]
        socialA.href = "#"
        socialA.style.textDecoration = "none"

        socialA.appendChild(socialIcon)
        loginSocialContainer.appendChild(socialA)
    })

    loginFormContainer.className = "form-container sign-in-container"
    loginSocialContainer.className = "social-container"
    errorLogbr.id = "errorBrLogin"
    loginForm.className = "authForm"
    loginForm.id = "lForm"
    loginUsername.id = "username"
    loginPassword.id = "password"
    loginUsername.className = "authInput"
    loginUsername.name = "username"
    loginPassword.className = "authInput"
    loginPassword.name = "password"
    loginBtn.type = "button"
    loginBtn.value = "Iniciar Sesión"
    loginBtn.id = "loginBtn"
    loginUsername.type = "text"
    loginPassword.type = "password"
    loginUsername.placeholder = "Usuario "
    loginPassword.placeholder = "Contraseña "

    loginTitle.appendChild(document.createTextNode('Iniciar Sesión'))

    loginForm.appendChild(loginTitle)
    loginForm.appendChild(loginSocialContainer)

    loginForm.appendChild(document.createElement('br'))
    loginForm.appendChild(loginUsername)
    loginForm.appendChild(loginPassword)
    loginForm.appendChild(errorLogbr)
    loginForm.appendChild(loginBtn)

    loginFormContainer.appendChild(loginForm)
    topContainer.appendChild(loginFormContainer)

    // Overlay Container
    let overlayContainer = document.createElement('div')
    let overlay = document.createElement('div')
    let leftPanel = document.createElement('div')
    let rightPanel = document.createElement('div')

    overlayContainer.className = "overlay-container"
    overlay.className = "overlay"
    leftPanel.className = "overlay-panel overlay-left"
    rightPanel.className = "overlay-panel overlay-right"

    // Left Panel
    let leftTitle = document.createElement('h1')
    let leftText = document.createElement('p')
    let leftButton = document.createElement('input')

    leftButton.className = "ghost"
    leftButton.type = "button"
    leftButton.id = "signIn"
    leftButton.value = "Iniciar Sesión"

    leftTitle.appendChild(document.createTextNode('¡Bienvenido de nuevo!'))
    leftText.appendChild(document.createTextNode('Para mantenerse conectado con nosotros, inicie sesión con su información personal'))

    leftPanel.appendChild(leftTitle)
    leftPanel.appendChild(leftText)
    leftPanel.appendChild(leftButton)

    // Right Panel
    let rightTitle = document.createElement('h1')
    let rightText = document.createElement('p')
    let rightButton = document.createElement('input')

    rightButton.className = "ghost"
    rightButton.id = "signUp"
    rightButton.type = "button"
    rightButton.value = "Registrarse"

    rightTitle.appendChild(document.createTextNode('Hola, ¿Eres Nuevo?'))
    rightText.appendChild(document.createTextNode('Ingresa tus datos personales y comienza tu viaje con nosotros'))

    rightPanel.appendChild(rightTitle)
    rightPanel.appendChild(rightText)
    rightPanel.appendChild(rightButton)

    overlay.appendChild(leftPanel)
    overlay.appendChild(rightPanel)
    overlayContainer.appendChild(overlay)

    topContainer.appendChild(overlayContainer)

    rightButton.addEventListener('click', () => {
        topContainer.classList.add("right-panel-active");
    });

    leftButton.addEventListener('click', () => {
        topContainer.classList.remove("right-panel-active");
    });

    document.getElementById('loginForm').appendChild(topContainer)

    $(loginForm).keypress(function(event) {
        let keyCode = (event.keyCode ? event.keyCode : event.which)

        if (keyCode == 13) {
            event.preventDefault()
            validateLoginForm()
        }
    })

    $(registerForm).keypress(function(event) {
        let keyCode = (event.keyCode ? event.keyCode : event.which)

        if (keyCode == 13) {
            event.preventDefault()
            validateRegisterForm()
        }
    })

    $(loginBtn).on('click', function(e) {
        e.preventDefault();
        validateLoginForm()
    })

    $('#registerBtn').on('click', function(e) {
        e.preventDefault()
        validateRegisterForm()
    })
}
let webAuth = new auth0.WebAuth({
    domain: 'dev--h21qj3n.us.auth0.com',
    clientID: 'dPVXErytsisi3Iw5xV6pS4NyRFIVU7GA',
    // redirectUri: 'http://localhost/GConcesionario_FRAMEWORK_JQUERY_OO_MVC/auth',
    redirectUri: 'http://192.168.1.175/GConcesionario_FRAMEWORK_JQUERY_OO_MVC/auth',
    responseType: 'token id_token',
    scope: 'openid profile email',
    leeway: 60
})

function setSessionExpiration(authResult) {
    let expires_at = JSON.stringify(
        authResult.expiresIn * 1000 + new Date().getTime()
    );

    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expires_at);
}

function logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');

    webAuth.logout({
        client_id: 'dPVXErytsisi3Iw5xV6pS4NyRFIVU7GA'
    });
}

function isAuthenticated() {
    let expires_at = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expires_at;
}

function getProfile() {
    if (!userProfile) {
        let accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            console.log("No access token");
        }

        webAuth.client.userInfo(accessToken, (err, profile) => {
            if (profile) {
                console.log(profile)
                userProfile = profile;
            }
        })
    }
}

function handleAuthentication() {
    webAuth.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
            window.location.hash = '';
            setSessionExpiration(authResult)

            let userInfo = {
                email: authResult.idTokenPayload.email,
                verified: authResult.idTokenPayload.email_verified || true,
                username: authResult.idTokenPayload.nickname,
                avatar: authResult.idTokenPayload.picture,
                uuid: authResult.idTokenPayload.sub.split('|')[1],
                password: null
            }

            ajaxPromiseWithSpinner('POST', friendlyURL('?page=auth&op=register'), 'json', userInfo).then((res) => {
                if (res.result.code == 4 || res.result.code == 23) {
                    ajaxPromiseWithSpinner('POST', friendlyURL('?page=auth&op=login'), 'json', userInfo).then((response) => {
                        localStorage.setItem('token', response)
                        window.location.href = friendlyURL('?page=home')
                    })
                }
            })

        } else if (err) {
            console.log(err)
        }
    })
}

$(document).ready(async() => {
    pausedPromise(350).then(() => {
        $('.gmailCl').on('click', (e) => {
            webAuth.authorize({
                connection: 'google-oauth2'
            });
        });
        $('.githubCl').on('click', (e) => {
            webAuth.authorize({
                connection: 'github'
            });
        });

    })

    loadForm()
    handleAuthentication()


});
