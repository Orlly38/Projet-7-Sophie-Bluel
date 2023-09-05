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

function gestion_login () {
    if (localStorage.getItem("token")) {
        let loginLogoutLink= document.getElementById("login_logout");
        loginLogoutLink.textContent="logout"
        let modif_profil=document.getElementById("modif_img_profil");
        modif_profil.style.display="block"
        let bandeau_edit=document.getElementById("edition");
        bandeau_edit.style.display="flex"
        let projet_modif=document.getElementById("modif_projet")
        projet_modif.style.display="inline"
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

// GESTION DE LA MODALE
let modal = null
//POUR OUVRIR LA BOITE MODALE
const OPEN_MODAL = function (e) {
    e.preventDefault()
    const TARGET = document.querySelector(e.target.getAttribute('href'))
    TARGET.style.display=null
    TARGET.removeAttribute('aria-hidden')       
    TARGET.setAttribute ('aria-modal', 'true')
    modal=TARGET
    modal.addEventListener('click', CLOSE_MODAL)
    //modal.querySelector('js-modal-close').addEventListener('click', CLOSE_MODAL)
}
//POUR FERMER LA BOITE MODAL
const CLOSE_MODAL = function (e) {
    if (modal=null) return
    e.preventDefault
    modal.style.display="none"
    modal.setAttribute ('aria-hidden', 'true')
    modal.removeAttribute ('aria-modal')
    modal.removeEventListener('click',CLOSE_MODAL)
    modal.querySelector('js-modal-close').removeEventListener ('click',CLOSE_MODAL)
    modal.querySelector('js-modal-stop').removeEventListener ('click', STOP_PROPAGATION)

  
    window.addEventListener('keydown', function (e) {
        if (e.key==="Escape" || e.key==="Esc"){
            CLOSE_MODAL(e)
        }
    })
}

const STOP_PROPAGATION=function (e) {
e.STOP_PROPAGATION()
}

document.querySelectorAll('.js-modal').forEach(a=>{
    a.addEventListener('click', OPEN_MODAL)
})

