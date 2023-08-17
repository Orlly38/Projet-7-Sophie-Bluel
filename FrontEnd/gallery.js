//CONSTANTES
const BASE_URL = "http://localhost:5678/api/"
const WORKS_API = BASE_URL+"works";
const CATEGORY_API = BASE_URL+"categories";
const GALLERY_DIV = document.querySelector(".gallery");
const FILTER_DIV = document.querySelector(".filter");
let workList;

//CREATION DU FETCH POUR IMPORTER LES TRAVAUX
fetch (WORKS_API)
    .then (reponse => reponse.json())
    .then (works => { //STOCKER WORKS VARIABLES GLOBALE
        workList=works
        for (let i=0; i<works.length; i++){
            createWork (works[i])   
   }})

//RECUPERATION DES CATEGORIES
fetch (CATEGORY_API)
    .then (reponse => reponse.json())
    .then (categories => {
        let filterWorks = new Set (categories)
        let nouvelleCategorie = {id:0,name:"Tous"};
        createFilterButton(nouvelleCategorie);
        addSelectedClass(nouvelleCategorie.id)
        for (let category of filterWorks) {
            createFilterButton (category)
        }   
    })
 
//CREATION DES BOUTONS FILTRES   
function createFilterButton (category) {
    let categoryLink = document.createElement ("a") 
    categoryLink.id="category"+category.id
    categoryLink.classList.add("category")
    categoryLink.innerHTML = category.name;
    FILTER_DIV.appendChild (categoryLink)


    //AJOUT DU EVENTLISTERNER SUR LES FILTRES
    categoryLink.addEventListener("click", function() {
        filterWorksByCategory(category.id);
    });
}

function filterWorksByCategory(categoryId) {
    //SUPPRIMER TOUT CE QU IL Y A DANS DIV GALLERY 
    GALLERY_DIV.innerHTML=''

    //AFFICHER UNIQUEMENT WORKS AVEC CATEGORY=CATEGORYID OU TOUS
    for (let i=0; i<workList.length; i++){
        if (workList[i].categoryId===categoryId || categoryId===0){
            createWork (workList[i])   
        }  
    }

    //GESTION DE L'APPARENCE DES FILTRES (SELECTION)
    removeSelectedClass() 
    addSelectedClass(categoryId) 
}
 

//CREATION D'UN PROJET
function createWork (work) {
    let figure = document.createElement ("figure");
    let imgWorks = document.createElement ("img");
    let figcaption = document.createElement ("figcaption");
    imgWorks.src = work.imageUrl;
    figcaption.innerHTML = work.title;
    GALLERY_DIV.appendChild (figure)
    figure.appendChild (imgWorks)
    figure.appendChild (figcaption)
}

//AJOUT DE LA CLASSE SELECTED A UNE CATEGORY
function addSelectedClass (categoryId) {
    document.getElementById("category"+categoryId).classList.add("selected")
}

//SUPRESSION DE LA CLASSE SELECTED AUX CATEGORIES
function removeSelectedClass() {
    let filters=document.querySelectorAll(".category");
    for (let i = 0; i <filters.length; i++) {
        filters[i].classList.remove ("selected")
    }
}