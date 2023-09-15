//CONSTANTES
const NEW_MODALE = document.querySelector(".modal-new-photo");
const BUTTON_CLOSE_NEW = document.querySelector('.js-modal-close-new');
const BUTTON_BACK = document.querySelector('.modal-back');

// GESTION DE LA MODALE
let modal_new = null
//POUR OUVRIR LA BOITE MODALE
const OPEN_MODAL_NEW = function (e) {
    e.preventDefault()
    //ON CACHE LA MODALE TRAVAUX
    modal.style.display="none";
    //ON AFFICHE LA MODALE DE CREATION
    modal_new=document.querySelector("#modal2");
    modal_new.style.display=null
    modal_new.addEventListener('click', CLOSE_MODAL_NEW)
    BUTTON_CLOSE_NEW.addEventListener('click', CLOSE_MODAL_NEW)
    let modal_wrapper=document.querySelector(".modal-wrapper-new")
    modal_wrapper.style.display="flex"
    //NEW_MODALE.innerHTML = '';
    //fetchWorks(NEW_MODALE, true);
}

//POUR FERMER LA BOITE MODAL
const CLOSE_MODAL_NEW = function (e) {
    if (modal_new==null) return
    //SI ON CLIQUE SUR AUTRE CHOSE QUE LA MODALE OU LE BOUTON ON NE VEUT PAS FERMER
    if (e.target != modal_new && e.target != BUTTON_CLOSE_NEW && e.target != document.querySelector('.top .fa-x') ) return
    e.preventDefault
    modal_new.style.display="none"
    modal_new.removeEventListener('click',CLOSE_MODAL_NEW)
    BUTTON_CLOSE_NEW.removeEventListener ('click',CLOSE_MODAL_NEW)

}

//BOUTON RETOUR
BUTTON_BACK.addEventListener("click",function(){
    modal_new.style.display="none";
    modal.style.display="flex";
})

document.querySelectorAll('#ajout_projet').forEach(a=>{
    a.addEventListener('click', OPEN_MODAL_NEW)
})
