// Cookies alert
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

function getCookie(cname) {
    var name = cname + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

const cookiesAlert = document.getElementById('js-cookies-alert');
const cookiesAlertClose = document.getElementById('js-cookies-alert-close');

if (!getCookie('hide-cookie-alert')) {
    cookiesAlert.classList.remove('d-none');
}

cookiesAlertClose.addEventListener('click', () => {
    cookiesAlert.classList.add('d-none');

    setCookie('hide-cookie-alert', true, 365);
});
