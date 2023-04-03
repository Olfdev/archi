const login = document.querySelector('.logmein');
const loginId = document.getElementById('login')
const errorCheck = document.querySelectorAll('p');
let connexionMsg;

login.addEventListener("submit", async function (event) {
    event.preventDefault();

    // if (errorCheck.classList.contains("error-message")){
    //     const errorMessages = document.querySelectorAll('.error-message');
    //     //connexionMsg.remove();
    //     errorMessages.forEach((errorMessage) => {
    //     errorMessage.classList.remove('error-message');
    //     });
    // }

    const email = event.target.querySelector("[name=email]").value;
    const password = event.target.querySelector("[name=password").value;

    console.log(email);
    console.log(password);

    const answer = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
             email: email,
             password: password,
        })
    })
    const mytoken = await answer.json();

    //console.log(mytoken);

    //create connexion error message class to new <p> and append it at the top of <section>
    connexionMsg = document.createElement("p");
    connexionMsg.classList.add('error-message');
    const topChild = loginId.firstChild;
    loginId.insertBefore(connexionMsg, topChild);

    if (mytoken.token != null){
        console.log("login OK");
        //create innerHTML in <h1>
        //connexionMsg.innerHTML = "Connexion réussie";
        localStorage.setItem('token', mytoken.token);
        console.log('Token stored in session storage:', mytoken.token);
        //set 1s delay: Clear the connexion message and redirects to index.html
        setTimeout(() => {
            window.location.href = "index.html";
        }, "1000")
    }else{
        console.log("login NOT OK");
        //create innerHTML in <h1>
        connexionMsg.innerHTML = "Adresse email et/ou mot de passe incorrects";
        //set 1s delay and clear the connexion message
        setTimeout(() => {
            connexionMsg.remove();
        }, "1000")

    }
});