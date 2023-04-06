import { createAll } from './works_filters.js';
import { worksArray } from './works_filters.js';

let works;

//fetch works
// const answerWorks = await fetch('http://localhost:5678/api/works');
// worksArray = await answerWorks.json();

const dialog = document.querySelector('.dialog');
const dialogP = dialog.querySelector('p');
//const link = document.querySelector('#admin-edit-portfolio')
const link = document.getElementById('admin-edit-portfolio')
const modalBkg = document.getElementById("modal-bkg");
const adminGallery = document.getElementById('admin-gallery');
const closeModal = document.getElementById('close');

//add a click event listener to the link element
if (link)
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
    //adminGallery.innerHTML = "";
    // DeleteItem();
    if (worksArray.length !== 0){
        for (let i = 0; i <= worksArray.length; i++) {
            //create variable for each work
            works = worksArray[i].id;
            //if (works.id == indexToDelete){
                deleteItem(works);
            //}
        }
    }
});

async function deleteItem(indexToDelete){
    //retrieve the token
    let myToken = localStorage.getItem('token');

    //compare the token with the stored one and get the backend answer
    const answer = await fetch(`http://localhost:5678/api/works/${indexToDelete}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${myToken}`}
    });
    //console.log(answer);
    //check if fetch answer is OK
    if (answer.ok){
        console.log(answer);
        //worksArray.splice(indexToDelete, 1);
        const idToDelete = worksArray.findIndex(work => work.id === indexToDelete);
        if (idToDelete !== -1) {
            worksArray.splice(idToDelete, 1);
            console.log(`array n°${idToDelete} containing id n°${indexToDelete} deleted on the backend`);
        }else{
            console.log(`No array found containing id n°${indexToDelete} (${idToDelete} returned). Nothing got deleted from the backend`);
        }
        console.log(worksArray);
        //create gallery
        createAll(adminGallery, () => {
        return "éditer";

    // createAll(gallery, () => {
    //     return works.title;
    // });
    });
    iconsCreate();
    //deleteWork = document.querySelectorAll('figure .delete');
    //deleteMyWork();
    }else{
        console.log(indexToDelete + " not deleted");
    }
}

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

// function iconsCreate(){

//     //create delete and move icons and append them to each figure
//     const figures = adminGallery.querySelectorAll('figure');
//     console.log(figures);
//     const firstFigure = adminGallery.querySelector('figure');

//     //create delete icon
//     const del = document.createElement("div");
//     del.classList.add('delete');
//     del.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

//     //create move icon
//     const move = document.createElement("div");
//     move.innerHTML = '<i class="fa-solid fa-arrows-up-down-left-right"></i>';
//     move.classList.add('move');

//     //append del icons
//     figures.forEach(fig => {
//         //fig.appendChild(move.cloneNode(true));
//         fig.appendChild(del.cloneNode(true));
//     });

//     //append move icon
//     firstFigure.appendChild(move);
// }

function iconsCreate(){

    //create delete and move icons and append them to each figure
    const figures = adminGallery.querySelectorAll('figure');
    console.log(figures);
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
    const deleteDivs = document.querySelectorAll(".delete");

    deleteDivs.forEach(deleteDiv => {
        deleteDiv.addEventListener("click", function() {
            console.log("Delete button clicked on index:", this.dataset.index);

            for (let i = 0; i < worksArray.length; i++) {
                console.log(i);
                if (i == this.dataset.index){
                deleteItem(worksArray[i].id);
                console.log(worksArray[i].id);
                } 
            }

            // arrayData = this.dataset.index;

            // for (let i = 0; i < worksArray.length; i++) {
            //     //create variable for each work
            //     works = worksArray[i];
            //     if (works.id == indexToDelete){
            //         deleteItem();
            //     }
            // }
            // do something else here
    });
});

    //append move icon
    if (worksArray.length !== 0) firstFigure.appendChild(move);
    

    // const deleteDivs = document.querySelectorAll(".delete");

    // deleteDivs.forEach(function(deleteDiv) {
    //     deleteDiv.addEventListener("click", function() {
    //         console.log("Delete button clicked on index:", this.dataset.index);
    //         // do something else here
    //     });
    // });
}

iconsCreate();

// function deleteMyWork(){
//     let deleteWork = document.querySelectorAll('figure .delete');
//     console.log(deleteWork);
//     deleteWork.forEach(event => {
//         event.addEventListener('click', () => {
//             const index = Array.from(deleteWork).indexOf(event);
//             console.log(`Clicked on element at index ${index}`);
//             indexToDelete = index + 1;
//             deleteItem();
//             //deleteWork = document.querySelectorAll('figure .delete');
//         });
//     });
// }
// deleteMyWork();
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