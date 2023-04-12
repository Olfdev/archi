import { createAll, worksTitle } from './works_filters.js';
import { worksArray } from './works_filters.js';
import { categoriesArray } from './works_filters.js';

let works;
let selectedPic;
let selectedDesc;
let selectedCat = 2;

const dialog = document.querySelector('.dialog');
const dialogP = dialog.querySelector('p');
const link = document.getElementById('admin-edit-portfolio')
const modalBkg = document.getElementById("modal-bkg");
const adminGallery = document.getElementById('admin-gallery');
const backModal = document.getElementById('back');
const closeModal = document.getElementById('close');
const addPictureBtn = document.getElementById('submit-btn');
const uploadBtn = document.getElementById('upload-btn');
const modalTitle = document.getElementById('gallery-title');
const addPicForm = document.getElementById('addpic-form');
const imgDesc = document.getElementById('img-description');
const formSelect = document.getElementById('form-select');

//retrieve the token
let myToken = localStorage.getItem('token');

//add a click event listener to the link element
if (link){
    link.addEventListener('click', event => {
        //draw the gallery dialog modal
        dialogRun(event);
        document.removeEventListener('click', event);
    });
}

//if X is clicked
closeModal.addEventListener('click', event => {
    //close the modal
    closeDialog();
    document.removeEventListener('click', event);
})

//if back arrow is clicked
backModal.addEventListener('click', event => {
    //close the modal -- A CHECKER, CLIGNOTEMENT DU FOND
    //closeDialog();
    //draw the gallery dialog modal
    dialogRun(event);
    document.removeEventListener('click', event);
})

//if add a picture button is clicked to access the upload modal
addPictureBtn.addEventListener('click', () => {
    //draw the add picture dialog modal
    addPictureRun();
})

//when a category is clicked
formSelect.addEventListener('click', () => {
    //set variable based on the clicked category for retrieval
    selectedCat = formSelect.options[formSelect.selectedIndex].value;
    document.removeEventListener('click', this);
});

//when upload button is clicked
uploadBtn.addEventListener('click', async (event) => {
    //get what user typed in the Title field
    selectedDesc = imgDesc.value;
    //add the new item to the database (picture, description and category)
    await addItem();
    //draw the gallery dialog modal
    dialogRun(event);
    document.removeEventListener('click', event);
});

//when the "empty gallery" link is clicked
dialogP.addEventListener('click', () => {
    //if array containing all works is not empty
    if (worksArray.length !== 0){
        for (let i = 0; i < worksArray.length; i++) {
            //create variable for each work and delete work = empty the gallery
            works = worksArray[i].id;
            deleteItem(works);
        }
    }
    document.removeEventListener('click', this);
});

function closeDialog(){
    //create the gallery so it refreshes works
    createAll(gallery, () => {
        return worksTitle;
    })
    //close the dialog
    dialog.close();
    //remove the modal background
    modalBkg.classList.remove('modal-bkg');
    //remove the overflow hidden
    document.body.style.overflowY = null;
}

async function deleteItem(indexToUse){
    //compare the token with the stored one and get the backend answer
    const answer = await fetch(`http://localhost:5678/api/works/${indexToUse}`, {
        method: 'DELETE',
        headers: {'Authorization': `Bearer ${myToken}`}
    });

    //check if fetch answer is OK
    if (answer.ok){
        //compare work index and index to use to delete the right one
        const idToDelete = worksArray.findIndex(work => work.id === indexToUse);

        //if id to delete exists (not -1)
        if (idToDelete !== -1) {
            //remove the id to delete from the array containing all works
            worksArray.splice(idToDelete, 1);
            console.log(`array n°${idToDelete} containing id n°${indexToUse} deleted on the backend`);
            //recreate gallery
            await createAll(adminGallery, () => {
                return "éditer";
            });

            //recreate icons
            iconsCreate();
        }else{
            console.log(`No array found containing id n°${indexToUse} (${idToDelete} returned). Nothing got deleted from the backend`);
        }
    }else{
        console.log("Error: Wrong credentials. Cannot delete array");
    }
}

async function addItem(){
    //create Formdata with selected image, typed title and selected category
    const formData = new FormData();
    formData.append("image", selectedPic);
    formData.append("title", selectedDesc);
    formData.append("category", selectedCat);
    //upload the picture, title and category (in formData)
    const answer = await fetch('http://localhost:5678/api/works/', {
        method: 'POST',
        headers: {'Authorization': `Bearer ${myToken}`},
        body: formData
    });

    //check if fetch answer is OK
    if (answer.ok){
        console.log("answer is OK");
    }else{
        console.log("answer is NOT OK");
    }
}

function iconsCreate(){
    //create delete and move icons and append them to each figure
    const figures = adminGallery.querySelectorAll('figure');
    const firstFigure = adminGallery.querySelector('figure');
    //create move icon
    const move = document.createElement("div");
    move.innerHTML = '<i class="fa-solid fa-arrows-up-down-left-right"></i>';
    move.classList.add('move');
    //append del icons
    figures.forEach((fig, index) => {
        //create delete icon
        const del = document.createElement("div");
        del.classList.add('delete');
        del.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        del.dataset.index = index;
        fig.appendChild(del); 
    });

    //select all delete icons
    const deleteDivs = document.querySelectorAll(".delete");
    //go through all delete icons
    deleteDivs.forEach(deleteDiv => {
        //delete work if delete icon is clicked
        deleteDiv.addEventListener("click", function() {
            console.log("Delete button clicked on index:", this.dataset.index);
            //loop through all works
            for (let i = 0; i < worksArray.length; i++) {
                //check if the i in the loop is equal to the index of the delete icon clicked
                if (i == this.dataset.index){
                    //delete the work corresponding with the delete icon clicked
                    deleteItem(worksArray[i].id);
                } 
            }
            document.removeEventListener('click', this);
        });
    });
    //append move icon on first thumbnail
    if (worksArray.length !== 0) firstFigure.appendChild(move);

}

function addPictureRun(){
    //empty upload variables but category (which is at 2 by default)
    selectedPic = "";
    selectedDesc = "";
    //empty input field
    imgDesc.value = "";
    //show the back arrow
    backModal.style.visibility = "visible";
    //change title
    modalTitle.innerHTML = "Ajout photo";
    //empty modal body and add addpic class to change CSS properties
    adminGallery.innerHTML = "";
    adminGallery.classList.add('addpic');
    //change adminGallery display to flex
    adminGallery.style.display = "flex";
    adminGallery.style.padding = "1.5rem";
    //create picture icon, add FontAwesome class and append it to adminAddPic
    const addPicIcon = document.createElement('i');
    addPicIcon.classList.add('fa-sharp', 'fa-regular', 'fa-image');
    adminGallery.appendChild(addPicIcon);
    //create add picture button and append it to adminAddPic
    const addPicBtn = document.createElement('button');
    addPicBtn.setAttribute('id', 'button-add-pic');
    addPicBtn.type= 'button';
    addPicBtn.innerHTML = "+ Ajouter photo";
    adminGallery.appendChild(addPicBtn);

    //if +add a picture button is clicked to select a picture to upload
    addPicBtn.addEventListener('click', () =>{
        selectImage();
        document.removeEventListener('click', this);
    })

    //add pic size limit text span and append it to adminGallery
    const span = document.createElement('span');
    span.innerHTML = "jpg, png : 4mo max";
    span.style.fontSize = "x-small";
    span.style.marginTop = "-1em";
    adminGallery.appendChild(span);

    //show the informations form
    addPicForm.style.display = null;

    //sort categories alphabetically
    categoriesArray.sort((a, b) => a.name.localeCompare(b.name));
    //create all categories and append them to the select field
    formSelect.innerHTML = "";
    for (let i = 0; i < categoriesArray.length; i++) {
        //create option tag
        const option = document.createElement('option');
        //set attribute for each categorie based on its id
        option.setAttribute('value', categoriesArray[i].id);
        //set innerHTML to the category name
        option.innerHTML = categoriesArray[i].name;
        //append category to the form
        formSelect.appendChild(option);
    }
    //display upload button
    uploadBtn.style.display = "block";
    //hide add picture button
    addPictureBtn.style.display = "none";
    //hide delete gallery link
    dialogP.style.display = "none";
}

async function dialogRun(event){
    //create gallery
    await createAll(adminGallery, () => {
        return "éditer";
    });

    //create icons
    iconsCreate();

    //hide back arrow
    backModal.style.visibility = "hidden";
    //hide the informations form
    addPicForm.style.display = "none";
    //change title
    modalTitle.innerHTML = "Galerie photo";
    //set back grid display
    adminGallery.style.display = null;
    //remove adminGallery .addpic class and set back padding
    adminGallery.classList.remove('addpic');
    adminGallery.style.padding = null;
    //hide upload button
    uploadBtn.style.display = null;
    //display add picture button
    addPictureBtn.style.display = null;
    //display delete gallery link back
    dialogP.style.display = null;

    //show the modal if not already open
    if (!dialog.open) {
        dialog.showModal();
    }
    //don't propagate inside the modal
    event.stopPropagation();
    //create black alpha background
    modalBkg.classList.add('modal-bkg');
    //set overflowY to hidden so we can't scroll
    document.body.style.overflowY = "hidden";

    //add a click event listener to the document object
    document.addEventListener('click', event => {
        //check if the clicked element is not the dialog or one of its descendants
        if (!dialog.contains(event.target)){
            //if the clicked element is not the dialog or one of its descendants, close the dialog
            closeDialog();
        }
        document.removeEventListener('click', event);
    });

    //close if ESC key is used
    document.addEventListener('keydown', event => {
    if (event.key === "Escape") {
        closeDialog();
        }
    });
    document.removeEventListener('click', event);
}

function selectImage(){
    // Create a new file input element
    const fileInput = document.createElement('input');
    //set to file
    fileInput.type = 'file';
    //set to PNG & JPG only
    fileInput.accept = 'image/jpeg, image/png';
    //get the selected file
    fileInput.onchange = function() {
        selectedPic = fileInput.files[0];
        //check if the file selected is an image
        if (!selectedPic.type.startsWith('image/')) {
            alert("Le fichier sélectionné n'est pas une image.");
            return;
        }

        //check if the image selected is less tha 4MB
        if (selectedPic.size > 4 * 1024 * 1024) {
            alert("L'image sélectionnée est trop lourde. Veuillez sélectionner une image de 4Mo maximum.");
            return;
        }

        //change adminGallery padding for the image to not have padding top
        adminGallery.style.padding = "0 1.5rem";
        //empty adminGallery and append the loaded image
        adminGallery.innerHTML = "";
        const img = document.createElement('img');
        img.src = URL.createObjectURL(selectedPic);
        img.style.height = "185px"
        img.style.width = "auto";
        img.style.maxWidth = "initial";
        //const addPic = document.querySelector('.addpic');        
        adminGallery.appendChild(img);
    };

    //click the fileInput
    fileInput.click();
}