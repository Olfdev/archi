const dialog = document.querySelector('.dialog');
const link = document.querySelector('#admin-edit-portfolio')
const modalBkg = document.getElementById("modal-bkg");

//add a click event listener to the link element
link.addEventListener('click', event => {

    //open the dialog
    dialog.showModal();
    event.stopPropagation();
    modalBkg.classList.add('modal-bkg');
    document.body.style.overflowY = "hidden";

    //add a click event listener to the document object
    document.addEventListener('click', event => {
        //check if the clicked element is not the dialog or one of its descendants
        if (!dialog.contains(event.target)){
            //if the clicked element is not the dialog or one of its descendants, close the dialog
            dialog.close();
            modalBkg.classList.remove('modal-bkg');
            document.body.style.overflowY = null;
            document.removeEventListener('click', event);
        }
    });
});