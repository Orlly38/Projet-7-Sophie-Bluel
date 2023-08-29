//CONSTANTES
const BASE_URL = "http://localhost:5678/api/"
const USERS_API = BASE_URL+"users/login";
const LOGIN_BUTTON = document.getElementById("se_connecter")

// AJOUT D'UN EVENEMENT AU CLIC POUR SE CONNECTER
LOGIN_BUTTON.addEventListener("click", function() {
    // EFFACE LE MESSAGE D'ERREUR AVANT NOUVELLE TENTATIVE
   // document.getElementById("login_error").innerHTML=""
    loginUser();
});


function loginUser(){
    //RECUPERATION E-MAIL ET MOT DE PASSE
    let user = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    //APPEL DE L'API POUR VERIFIER L'E-MAIL ET LE MOT DE PASSE
    fetch (USERS_API,{
        method: 'POST',
        headers: {
             'Content-Type': 'application/json;charset=utf-8'
         },
          body: JSON.stringify(user)
    })
    .then (response => loginResponse(response))
}   

function loginResponse(response) {
    //SI L'EMAIL ET LE MOT DE PASSE SONT CORRECTS
    if (response.status===200){
        // STOCKAGE DU TOKEN DANS LE LOCAL STORAGE
        localStorage.setItem("token", response.token);
        // REDIRECTION VERS LA PAGE D'ACCUEIL
        window.location.href = "index.html";
    }
    //SI IL Y A UNE ERREUR DANS L'EMAIL OU LE MOT DE PASSE
    else {
        let loginError=document.getElementById("login_error");
        loginError.innerHTML="E-mail ou mot de passe incorrect";
        loginError.style.display="flex";
    }
}

