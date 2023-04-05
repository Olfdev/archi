import { createAll } from './works_filters.js';

let worksArray;

//fetch works
// const answerWorks = await fetch('http://localhost:5678/api/works');
// worksArray = await answerWorks.json();

const dialog = document.querySelector('.dialog');
const dialogP = dialog.querySelector('p');
const link = document.querySelector('#admin-edit-portfolio')
const modalBkg = document.getElementById("modal-bkg");
const adminGallery = document.getElementById('admin-gallery');
const closeModal = document.getElementById('close');

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
            closeDialog();
            document.removeEventListener('click', event);
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key === "Escape") {
            closeDialog();
            document.removeEventListener('click', event);
        }
      });
});

dialogP.addEventListener('click', () => {
    adminGallery.innerHTML = "";
});

closeModal.addEventListener('click', event => {
    closeDialog();
    document.removeEventListener('click', event);
})

function closeDialog(){
    dialog.close();
    modalBkg.classList.remove('modal-bkg');
    document.body.style.overflowY = null;
}

//create gallery
createAll(adminGallery, () => {
    return "éditer";
});

//create delete and move icons and append them to each figure
const figures = adminGallery.querySelectorAll('figure');
const firstFigure = adminGallery.querySelector('figure');

const del = document.createElement("div");
del.classList.add('delete');
del.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

const move = document.createElement("div");
move.innerHTML = '<i class="fa-solid fa-arrows-up-down-left-right"></i>';
move.classList.add('move');

figures.forEach(fig => {
    fig.appendChild(del.cloneNode(true));
    //fig.appendChild(move.cloneNode(true));
});

firstFigure.appendChild(move);

// figures.forEach(append => {
//     append.appendChild(del);
//     append.appendChild(move);
// })


    



//     //create DOM works for category All
//     gallery.innerHTML = "";
//     for (let i = 0; i < worksArray.length; i++) {

//         //create variable for each work
//         const works = worksArray[i];
        
//         //create <figure> and append it to #gallery
//         const figure = document.createElement("figure");
//         gallery.appendChild(figure);

//         //create <img>, image source & alt, and append it to the above <figure>
//         const img = document.createElement("img");
//         img.src = works.imageUrl;
//         img.alt = "Gallery picture";
//         figure.appendChild(img);
        
//         //create <figcaption> and append it to above <figure>
//         const figcaption = document.createElement("figcaption");
//         figure.appendChild(figcaption);
//         figcaption.style.fontSize = "small";
//         figcaption.style.cursor = "pointer";
//         figcaption.style.width = "fit-content";
//         figcaption.innerHTML = "éditer";
//     }
// }