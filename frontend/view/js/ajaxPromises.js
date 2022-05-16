const pausedPromise = (ms) => new Promise((resolve, reject) => {
    setTimeout(async() => {
        try {
            resolve()
        } catch (error) {
            reject(error)
        }
    }, ms);
})

const ajaxPromiseWithSpinner = (method, url, dataType, vData) => new Promise((resolve, reject) => {
    try {
        $.ajax({
            type: method,
            url: url,
            data: vData,
            dataType: dataType,
            beforeSend: () => {
                let head = document.getElementsByTagName('HEAD')[0];
                let link = document.createElement('link');
                let clock = document.createElement('div');
                let clockWrapper = document.createElement('div')

                link.rel = 'stylesheet';
                link.type = 'text/css';
                link.href = './view/css/clock.css';

                clockWrapper.className = "clock-wrapper"
                clockWrapper.id = "clockWrapper"

                clock.className = "clock-loader"
                clock.id = "clock"

                head.appendChild(link);
                clockWrapper.appendChild(clock)
                document.body.insertBefore(clockWrapper, document.body.firstChild)
            },
            success: (data) => resolve(data),
            error: (error) => reject(error),
            complete: () => {
                document.getElementById('clockWrapper').remove();
            }
        });
    } catch (error) {
        reject(error)
    }
});

const ajaxPromise = (method, url, dataType, vData) => new Promise((resolve, reject) => {
    try {
        $.ajax({
            type: method,
            data: vData,
            url: url,
            dataType: dataType,
            success: (data) => {
                resolve(data)
            },
            error: (error) => {
                reject(error)
            }
        });
    } catch (error) {
        reject(error)
    }
});

const ajaxPromiseW_Token = (method, url, dataType, vData) => new Promise((resolve, reject) => {
    try {
        $.ajax({
            type: method,
            data: vData,
            url: url,
            dataType: dataType,
            headers: { token: localStorage.getItem('token') != null ? localStorage.getItem('token').replace(/['"]+/g, '') : false },
            success: (data) => {
                resolve(data)
            },
            error: (error) => {
                reject(error)
            }
        });
    } catch (error) {
        reject(error)
    }
});

const friendlyURL = (url) => {
    let link = "";
    let cont = 0;

    url = url.replace("?", "");
    url = url.split("&");

    for (let i = 0; i < url.length; i++) {
        cont++;
        let aux = url[i].split("=");

        if (cont == 2) link += "/" + aux[1] + "/";
        else link += "/" + aux[1];
    }

    // FIXME: La ip no se tiene que ver y no poner localhost porque sino solo funciona en el portatil.
    // return "http://localhost/GConcesionario_FRAMEWORK_JQUERY_OO_MVC" + link;
    return "http://192.168.1.175/GConcesionario_FRAMEWORK_JQUERY_OO_MVC" + link;
}