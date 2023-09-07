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
    document.querySelector('.js-modal-close').addEventListener('click', CLOSE_MODAL)
    let test_affich_modal=document.querySelector(".modal-wrapper")
    test_affich_modal.style.display="flex"
}



//POUR FERMER LA BOITE MODAL
const CLOSE_MODAL = function (e) {
    if (modal==null) return
    e.preventDefault
    modal.style.display="none"
    modal.setAttribute ('aria-hidden', 'true')
    modal.removeAttribute ('aria-modal')
    modal.removeEventListener('click',CLOSE_MODAL)
    document.querySelector('js-modal-close').removeEventListener ('click',CLOSE_MODAL)
    document.querySelector('js-modal-stop').removeEventListener ('click', STOP_PROPAGATION)

  
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

