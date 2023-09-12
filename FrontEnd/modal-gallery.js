//CONSTANTES
const GALLERY_MODALE = document.querySelector(".modal-gallery");
const BUTTON_CLOSE = document.querySelector('.js-modal-close');

// GESTION DE LA MODALE
let modal = null
//POUR OUVRIR LA BOITE MODALE
const OPEN_MODAL = function (e) {
    e.preventDefault()
    const TARGET = document.querySelector(e.target.getAttribute('href'))
    TARGET.style.display=null
    modal=TARGET
    modal.addEventListener('click', CLOSE_MODAL)
    BUTTON_CLOSE.addEventListener('click', CLOSE_MODAL)
    let test_affich_modal=document.querySelector(".modal-wrapper")
    test_affich_modal.style.display="flex"
    GALLERY_MODALE.innerHTML = '';
    fetchWorks(GALLERY_MODALE, true);
}


//POUR FERMER LA BOITE MODAL
const CLOSE_MODAL = function (e) {
    if (modal==null) return
    //SI ON CLIQUE SUR AUTRE CHOSE QUE LA MODALE OU LE BOUTON ON NE VEUT PAS FERMER
    if (e.target != modal && e.target != BUTTON_CLOSE && e.target != document.querySelector('.fa-solid') ) return
    e.preventDefault
    modal.style.display="none"
    modal.removeEventListener('click',CLOSE_MODAL)
    BUTTON_CLOSE.removeEventListener ('click',CLOSE_MODAL)
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


const DELETE_WORK = async function (e) {
    const confirmation = confirm("Êtes-vous sûr de vouloir supprimer ce projet ?");

    if (confirmation) {
        try {
            await deleteWorkFetch(e.target.id);
        } catch (error) {
            console.error("Erreur lors de la suppression du projet:", error);
        }
    }
}

function deleteWorkFetch(idWork){
    let token = localStorage.getItem("token");

    fetch (WORKS_API+'/'+idWork, {
        method: "DELETE",
        headers: {
            'Accept': '*/*',
            'Authorization': `Bearer ${token}`,
        }
    })
    .then (reponse => {
        //A FAIRE : SUPPRIMER DU DOM DANS gallery et gallery-modal
        //A FAIRE : ENLEVER REFRESH
    })

}