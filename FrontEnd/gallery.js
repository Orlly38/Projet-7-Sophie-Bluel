//CREATION DU FETCH POUR IMPORTER LES TRAVAUX
const gallery = document.querySelector(".gallery");
const worksApi = "http://localhost:5678/api/works";

fetch (worksApi)
    .then (reponse => reponse.json())
    .then (works => {
        for (let i=0; i<works.length; i++){
            let figure = document.createElement ("figure");
            let imgWorks = document.createElement ("img");
            let figcaption = document.createElement ("figcaption");
            imgWorks.src = works[i].imageUrl;
            figcaption.innerHTML = works[i].title;
            gallery.appendChild (figure)
            figure.appendChild (imgWorks)
            figure.appendChild (figcaption)
   }})

//CREATION D'UN FILTRE POUR TRIER LES TRAVAUX
const categoryWorks = "http://localhost:5678/api/categories";
const filterDiv = document.querySelector(".filter");
fetch (categoryWorks)
    .then (reponse => reponse.json())
    .then (categories => {
    const filterWorks = new Set (categories)
    const nouvelleCategorie = { id:0, name: "Tous" };
    createFilterBtn(nouvelleCategorie);
    console.log (filterWorks);
    for (let category of filterWorks) {
    createFilterBtn (category)
    }   
    })
 
function createFilterBtn (category) {
    let categoryLink = document.createElement ("a")
    categoryLink.innerHTML = category.name;
    filterDiv.appendChild (categoryLink)
}