let worksArray;
let workName;
const gallery = document.getElementById('gallery');
const allBtn = document.getElementById('button-all');
const objBtn = document.getElementById('button-objects');
const aptBtn = document.getElementById('button-apartments');
const hotelBtn = document.getElementById('button-hotels');
const buttons = document.querySelectorAll('.button');

//selected button background and text color change
buttons.forEach(button => {
    button.addEventListener('click', function() {
      buttons.forEach(btn => btn.classList.remove('button-selected'));
      this.classList.add('button-selected');
    });
  });

//fetch works
const answer = await fetch('http://localhost:5678/api/works');
worksArray = await answer.json();

//create all works
function createAll(){
    document.getElementById('gallery').innerHTML = "";
    for (let i = 0; i < worksArray.length; i++) {

        //create variable for each work
        const works = worksArray[i];
        
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

//button create objects works
objBtn.addEventListener('click', () => {
    workName = "Objets";
    document.getElementById('gallery').innerHTML = "";
    createDom();
});

//button create apartments works
aptBtn.addEventListener('click', () => {
    workName = "Appartements";
    document.getElementById('gallery').innerHTML = "";
    createDom();
});

//button create hotels and restaurants works
hotelBtn.addEventListener('click', () => {
    workName = "Hotels & restaurants";
    document.getElementById('gallery').innerHTML = "";
    createDom();
});

//button create all works
allBtn.addEventListener('click', () => {
    createAll();
});

//create DOM
function createDom(){
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
createAll();