let worksArray;
let workName;
let works;
let categoriesArray;
const gallery = document.getElementById('gallery');
const btnContainer = document.querySelector('.buttons-container');
//fetch works
const answerWorks = await fetch('http://localhost:5678/api/works');
worksArray = await answerWorks.json();
console.log(worksArray);
export { worksArray };

//fetch categories
const answerCategories = await fetch('http://localhost:5678/api/categories');
categoriesArray = await answerCategories.json();

//create DOM works for category All
// function createAll(){
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
//         figcaption.innerHTML = works.title;
//     }
// }

//create DOM works for category All
export function createAll(element, getSubtitle){
    element.innerHTML = "";
    for (let i = 0; i < worksArray.length; i++) {

        //create variable for each work
        works = worksArray[i];
        //const worksSubtitle = works.title;
        const subtitle = getSubtitle();
        
        //create <figure> and append it to #gallery
        const figure = document.createElement("figure");
        figure.style.position = "relative";
        element.appendChild(figure);

        //create <img>, image source & alt, and append it to the above <figure>
        const img = document.createElement("img");
        img.src = works.imageUrl;
        img.alt = "Gallery picture";
        figure.appendChild(img);
        
        //create <figcaption> and append it to above <figure>
        const figcaption = document.createElement("figcaption");
        figure.appendChild(figcaption);
        figcaption.innerHTML = subtitle;
    }
    if (worksArray.length === 0){
        const p = document.createElement("span");
        //p.style.position = "relative";
        p.innerHTML = "Aucun travaux à afficher"
        p.style.textTransform = "uppercase";
        element.appendChild(p);
    }
}

//category All, button create
const allBtn = document.createElement('button');
allBtn.classList.add('button');
allBtn.type= 'button';
allBtn.innerHTML = "Tous";
allBtn.classList.add('button-selected');
btnContainer.appendChild(allBtn);

//category All button: change class for background & text color
allBtn.addEventListener('click', () => {
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(oldBtn => oldBtn.classList.remove('button-selected'));
    allBtn.classList.add('button-selected');
    createAll(gallery, () => {
        return works.title;
    });
});

//categories buttons create
for (let i = 0; i < categoriesArray.length; i++) {
	const btn = document.createElement('button');
	btn.classList.add('button');
    btn.type= 'button';
    btn.innerHTML = categoriesArray[i].name;
	btn.addEventListener('click', () => {
        const buttons = document.querySelectorAll('.button');
        buttons.forEach(oldBtn => oldBtn.classList.remove('button-selected'));
        btn.classList.add('button-selected');
        workName = categoriesArray[i].name;
        createDom();
	});
	btnContainer.appendChild(btn);
}

//create DOM works for each category (except All)
function createDom(){
    gallery.innerHTML = "";
    const filtered = worksArray.filter(element => element.category.name === workName);
    for (let i = 0; i < filtered.length; i++) {
        const works = filtered[i];

        //create <figure> and append it to #gallery
        const figure = document.createElement("figure");
        gallery.appendChild(figure);

        //create <img>, image source & alt, and append it to the above <figure>
        const img = document.createElement("img");
        img.src = works.imageUrl;
        img.alt = "Gallery picture";
        figure.appendChild(img);
        
        //create <figcaption> and append it to above <figure>
        const figcaption = document.createElement("figcaption");
        figure.appendChild(figcaption);
        figcaption.innerHTML = works.title;
    }
}
createAll(gallery, () => {
    return works.title;
});