const logoutLink = document.getElementById('logout-link');
const header = document.querySelector('header');
const adminEdit = document.getElementById('admin-edit');
const portfolioTitle = document.getElementById('portfolio-title')
const buttonsContainer = document.querySelector('.buttons-container');

//logged in
//check if the token is present in sessionStorage
var token = localStorage.getItem('token');

//if yes, the user is connected
if (token !== null){
    console.log('User is connected');
    //display the logout link
    document.getElementById('logout-link').style.display = 'block';
    //hide the login link
    document.getElementById('login-link').style.display = 'none';
    //display admin links
    displayAdmin();
}else{
    console.log('User is not connected');
    //hide the logout link
    document.getElementById('logout-link').style.display = 'none';
    //display the login link
    document.getElementById('login-link').style.display = 'block';
}

//log out
//get the logout link
logoutLink.addEventListener('click', function() {
	//remove the token from session storage
	//localStorage.removeItem('token');
	localStorage.clear();
	console.log('Token removed from session storage');
	//refresh index.html
	window.location.href = "/index.html";
});

function displayAdmin(){
    //remove the filter buttons
    buttonsContainer.style.visibility = 'hidden';
    buttonsContainer.style.marginBlock = "2em"
    //create <div> and insert it at the top of <header>
    const editBar = document.createElement("div");
    const topChild = header.firstChild;
    editBar.setAttribute('id', 'admin-bar');
    header.insertBefore(editBar, topChild);

    //create <i>, add Fontawesome class and append it to the above <div>
    const i = document.createElement("i");
    i.classList.add('fa-regular', 'fa-pen-to-square');
    editBar.appendChild(i);

    //create <p> and append it to the above <div>
    const p = document.createElement("p");
    p.innerHTML = "Mode édition";
    editBar.appendChild(p);

    //create button and append it to the above <div>
    const editBtn = document.createElement('button');
    editBtn.setAttribute('id', 'button-changes');
    editBtn.type= 'button';
    editBtn.innerHTML = "publier les changements";
    editBar.appendChild(editBtn);

    //create <i>, add Fontawesome class and append it to adminEdit
    const ia = document.createElement("i");
    ia.classList.add('fa-regular', 'fa-pen-to-square');
    adminEdit.appendChild(ia);

    //create <p> and append it to adminEdit
    const pa = document.createElement("p");
    pa.innerHTML = "modifier";
    adminEdit.appendChild(pa);

    //create <div> and append it to portfolioTitle
    const div = document.createElement("div");
    div.setAttribute('id', 'admin-edit-portfolio');
    portfolioTitle.appendChild(div);

    //create <i>, add Fontawesome class and append it to the above <div>
    const ib = document.createElement("i");
    ib.classList.add('fa-regular', 'fa-pen-to-square');
    div.appendChild(ib);

    //create <p> and append it to the above <div>
    const pb = document.createElement("p");
    pb.innerHTML = "modifier";
    div.appendChild(pb);
}