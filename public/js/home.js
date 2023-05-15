document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#create_repo').onclick = createRepo;
    document.querySelector("#create").onclick = createNewRepo;
    document.querySelector("#close").onclick = () => {
        document.querySelector('.create-box').classList.add('hidden');
    }
    // add session_id in query params to local storage
    var url = new URL(window.location.href);
    var session_id = url.searchParams.get('sessionid');
    if(session_id){
        localStorage.setItem('sessionid', session_id);
    }
    else if(!localStorage.getItem('sessionid')){
        window.location.href = '/auth/login';
    }
    


});

function createRepo(){
    document.querySelector('.create-box').classList.remove('hidden');
}

async function createNewRepo(){
    var name = document.querySelector('#repo_name').value;
    var description = document.querySelector('#repo_description').value;
    var visibility = document.querySelector('#repo_private').value;
    
    console.log(name, description, visibility)
    var body = JSON.stringify({
        name: name,
        description: description,
        sessionid: localStorage.getItem('sessionid'),
        private: visibility
    });
    // post request to create repo
    console.log(body);
    var response = await fetch('/createRepo', {
        method: 'POST',
        body: body,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    var result = await response.json();
    if (result.success){
        alert(result.message);
        window.location.href = `/?sessionid=${localStorage.getItem('sessionid')}`;
    }
    else{
        alert(result.message);
    }
}