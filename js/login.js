const login = document.querySelector('.logmein');
const loginId = document.getElementById('login')
const submitBtn = document.getElementById('submit-btn');
//const errorCheck = document.querySelectorAll('p');
let connexionMsg;

//listen to the submit button
login.addEventListener("submit", async function (event) {
    event.preventDefault();

    //store email and password inputs from user and convert them to JSON
    const email = event.target.querySelector("[name=email]").value;
    //console.log(event.target.querySelector("[name=email]").value);
    const password = event.target.querySelector("[name=password").value;
    //console.log(event.target.querySelector("[name=password").value);
    const credentials = JSON.stringify({email: email, password: password})
    //console.log(credentials);

    //compare the credentials with the stored ones and get the backend answer
    const answer = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: credentials
    })
    //console.log(answer);
    //check if fetch answer is OK
    if (answer.ok){
        //store the JSON answer
        const mytoken = await answer.json(); 
        //console.log(mytoken);
        console.log("login OK");
        localStorage.setItem('token', mytoken.token);
        //change submit button text by throbber and remove pointer cursor
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
        submitBtn.setAttribute("disabled", "true");
        submitBtn.style.cursor = "auto";
        submitBtn.style.pointerEvents = "none";
        //console.log('Token stored in session storage:', mytoken.token);
        //set 1s delay: Clear the connexion message and redirects to index.html
        setTimeout(() => {
            window.location.href = "index.html";
        }, "1000")
    }else{
        console.log("login NOT OK");
        //check if error message doesn't already exists and if not, create connexion error message class to new <p> and append it at the top of <section>
        const errorCheck = document.querySelector('.error-message');
        if (errorCheck === null){
            connexionMsg = document.createElement("p");
            connexionMsg.innerHTML = "Adresse email et/ou mot de passe incorrects";
            connexionMsg.classList.add('error-message');
            const topChild = loginId.firstChild;
            loginId.insertBefore(connexionMsg, topChild);
            //set 2s delay and clear the connexion message
            setTimeout(() => {
                connexionMsg.remove();
            }, "2000")
        }
    }
});