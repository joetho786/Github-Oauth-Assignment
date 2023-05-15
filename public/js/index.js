// write functions to handle clicking of authorize button and create repo button

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#authorize').onclick = authorize;
    document.querySelector('#create-repo').onclick = createRepo;
});

function authorize() {
    // redirect to github authorization page
    window.location.href = '/auth/login';
    
}

function createRepo() {
    return false;
}