//CONSTANTES
const NEW_MODALE = document.querySelector(".modal-new-photo");
const BUTTON_CLOSE_NEW = document.querySelector('.js-modal-close-new');
const BUTTON_BACK = document.querySelector('.modal-back');
const BUTTON_ADD = document.querySelector('.button-add-photo');
const INPUT_PICTURE = document.querySelector('#input-picture');
const PICTURE_PREVIEW = document.querySelector('#picture-preview');
const PICTURE_SELECTION = document.querySelector('.picture-selection');
const CATEGORIES_SELECT = document.querySelector('.select-category');
const TITLE_NEW_PHOTO = document.querySelector('.input-titre');
const BUTTON_SUBMIT = document.querySelector('.button-submit');

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
    resetPhotoSelection();
    loadCategories();
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

//BOUTON AJOUT PHOTO 
BUTTON_ADD.addEventListener("click", function(){
    INPUT_PICTURE.click();
})

//SELECTEUR FICHIER PHOTO
INPUT_PICTURE.addEventListener("change",function(){
    if(this.files[0].size > 4194304){
        alert("Fichier trop volumineux");
        this.value = "";
     };
     if (this.files[0]) {
        PICTURE_PREVIEW.src = URL.createObjectURL(this.files[0])
        PICTURE_PREVIEW.style.display="block";
        PICTURE_SELECTION.style.display="none";
     }
})

//REMISE A ZERO SELECTION IMAGE
function resetPhotoSelection(){
    INPUT_PICTURE.value= "";
    PICTURE_PREVIEW.src ="";
    PICTURE_PREVIEW.style.display="none"
    PICTURE_SELECTION.style.display ="block";
}

//CHARGEMENT CATEGORIES DEPUIS API
function loadCategories(){
    let option = document.createElement("option");
    option.value = 0;
    option.text = "";
    CATEGORIES_SELECT.add(option);
    fetch (CATEGORY_API)
    .then (reponse => reponse.json())
    .then (categories => {
        for (let category of categories) {
            let option = document.createElement("option");
            option.value = category.id;
            option.text = category.name;
            CATEGORIES_SELECT.add(option);
        }   
    })
}


//UPLOAD NOUVEAU PROJET
const UPLOAD_WORK = function(){

    let token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("image", INPUT_PICTURE.files[0]);
    formData.append("title", TITLE_NEW_PHOTO.value);
    formData.append("category", CATEGORIES_SELECT.value);

    fetch (WORKS_API, {
        method: "POST",
        headers: {
            'Accept': '*/*',
            'Authorization': `Bearer ${token}`,
        },
        body : formData
    })
    .then (response => {
        if (response.status===200 ||response.status===201){
            alert('succes');
        }else if (response.status===401){
            alert('session expirée ou invalide');
        }else{
            alert('echec technique inconnu');
        }
        })

    

    
}



//VERIFICATION FORMULAIRE COMPLET
const VERIFICATION = function (e) {
    if(INPUT_PICTURE.value != "" && CATEGORIES_SELECT.value !=0 && TITLE_NEW_PHOTO.value!=""){
        BUTTON_SUBMIT.style.backgroundColor="#1D6154";
        BUTTON_SUBMIT.style.cursor="pointer";
        BUTTON_SUBMIT.addEventListener("click",UPLOAD_WORK);

    }else{
        BUTTON_SUBMIT.style.backgroundColor="#A7A7A7";
        BUTTON_SUBMIT.style.cursor="default";
        BUTTON_SUBMIT.removeEventListener("click", UPLOAD_WORK);
    }
}

INPUT_PICTURE.addEventListener("change",VERIFICATION);
CATEGORIES_SELECT.addEventListener("change",VERIFICATION);
TITLE_NEW_PHOTO.addEventListener("change",VERIFICATION);


document.querySelectorAll('#ajout_projet').forEach(a=>{
    a.addEventListener('click', OPEN_MODAL_NEW)
})
