export let worksTitle;
export let categoriesArray;
export let worksArray;

let workName;
let works;

const gallery = document.getElementById('gallery');
const btnContainer = document.querySelector('.buttons-container');

async function fetchWorks(){
    //fetch works
    const answerWorks = await fetch('http://localhost:5678/api/works');
    worksArray = await answerWorks.json();
    console.log(worksArray);
}

//fetch categories
const answerCategories = await fetch('http://localhost:5678/api/categories');
categoriesArray = await answerCategories.json();

//create DOM works
export async function createAll(element, getSubtitle){
    //fetch works
    await fetchWorks();
    //empty innerHTML
    element.innerHTML = "";
    //create each work
    for (let i = 0; i < worksArray.length; i++) {
        console.log(worksArray.length);
        //create variable for each work
        works = worksArray[i];
        worksTitle = works.title;
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

    //create empty message if there is no work to display
    if (worksArray.length === 0){
        const p = document.createElement("h2");
        //p.style.position = "relative";
        p.innerHTML = "Aucun travaux à afficher"
        p.style.textTransform = "uppercase";
        p.style.fontSize = "initial";
        element.style.display = "block";
        element.appendChild(p);
    }else{
        element.style.display = null;
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
    document.removeEventListener('click', this);
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
        document.removeEventListener('click', this);
	});
	btnContainer.appendChild(btn);
}

//create DOM works for each category (except All)
function createDom(){
    gallery.innerHTML = "";
    const filtered = worksArray.filter(element => element.category.name === workName);
    for (let i = 0; i < filtered.length; i++) {
        const works = filtered[i];
        worksTitle = works.title;
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
        figcaption.innerHTML = worksTitle;
    }
}

//create gallery
createAll(gallery, () => {
    return worksTitle;
});