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

