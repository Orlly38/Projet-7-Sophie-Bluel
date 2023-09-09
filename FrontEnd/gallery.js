//CONSTANTES
const BASE_URL = "http://localhost:5678/api/"
const WORKS_API = BASE_URL+"works";
const CATEGORY_API = BASE_URL+"categories";
const GALLERY_DIV = document.querySelector(".gallery");
const FILTER_DIV = document.querySelector(".filter");


fetchWorks(GALLERY_DIV,false);

function fetchWorks(targetDiv, deleteButton){
    //CREATION DU FETCH POUR IMPORTER LES TRAVAUX
    fetch (WORKS_API)
        .then (reponse => reponse.json())
        .then (works => { //STOCKER WORKS VARIABLES GLOBALE
            workList=works
            for (let i=0; i<works.length; i++){
                createWork (works[i], targetDiv, deleteButton)   
    }})
}

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

//MODIFICATION LOGIN EN LOGOUT SI NECESSAIRE
gestion_login();
 
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
            createWork (workList[i],GALLERY_DIV,false)   
        }  
    }

    //GESTION DE L'APPARENCE DES FILTRES (SELECTION)
    removeSelectedClass() 
    addSelectedClass(categoryId) 
}
 

//AFFICHAGE D'UN PROJET
function createWork (work, targetDiv,deleteButton) {
    let figure = document.createElement ("figure");
    let imgWorks = document.createElement ("img");
    let figcaption = document.createElement ("figcaption");
    imgWorks.src = work.imageUrl;
    figcaption.innerHTML = work.title;
    targetDiv.appendChild (figure)
    figure.appendChild (imgWorks)
    figure.appendChild (figcaption)
    if (deleteButton) { // SI ON A DEMANDE LA CREATION D'UN BOUTON DE SUPPR (deleteButton == true)
        createDeleteButton(figure,work)
    }
}

//CREATION D'UN BOUTON SUPPRIMER POUR CHAQUE IMAGE
function createDeleteButton (figure,work){
    let button = document.createElement('i');
    button.classList.add("fa-regular", "fa-trash-can");
    button.addEventListener('click', DELETE_WORK)
    button.id = work.id
    figure.appendChild(button)
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

function gestion_login () {
    if (localStorage.getItem("token")) {
        //POUR CHANGER LE MOT LOGIN EN LOGOUT
        let loginLogoutLink= document.getElementById("login_logout");
        loginLogoutLink.textContent="logout"
        //POUR FAIRE APPARITRE LE BANDEAU EDITION
        let bandeau_edit=document.getElementById("edition");
        bandeau_edit.style.display="flex"
        //POUR FAIRE APPARAITRE LA MODIFICATION DES PROJETS
        let projet_modif=document.getElementById("modif_projet")
        projet_modif.style.display="inline"
        //POUR CACHER LES FILTRES EN MODE EDITION
        let button_filter=document.querySelector(".filter")
        button_filter.style.display="none"
        // DÉCONNEXION LORS DU CLIQUE SUR LOGOUT
        loginLogoutLink.addEventListener("click", function (event) {
            event.preventDefault();

            // SUPPRESSION DU TOKEN DU LOCAL STORAGE
            localStorage.removeItem("token");

            // REDIRECTION VERS LA PAGE D'ACCUEIL
            window.location.href = "index.html";
        });
    }
}

