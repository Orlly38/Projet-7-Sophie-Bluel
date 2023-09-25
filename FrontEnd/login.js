//CONSTANTES
const BASE_URL = "http://localhost:5678/api/"
const USERS_API = BASE_URL+"users/login";
const LOGIN_BUTTON = document.getElementById("se_connecter")

// AJOUT D'UN EVENEMENT AU CLIC POUR SE CONNECTER
LOGIN_BUTTON.addEventListener("click", function() {
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
    .then(response => {
        if (response.status===200){
            //SI LOGIN OK ON CONVERTI EN JSON 
            return response.json();
        }else{
            //SI EMAIL OU MDP KO ON AFFICHE MESSAGE ERREUR
            loginError=document.getElementById("login_error");
            loginError.innerHTML="E-mail ou mot de passe incorrect";
            loginError.style.display="flex";
        }
    })
    .then(data=>{
        if(data){ //SI LOGIN OK 
            // STOCKAGE DU TOKEN DANS LE SESSION STORAGE
            sessionStorage.setItem("token", data.token);
            // REDIRECTION VERS LA PAGE D'ACCUEIL
             window.location.href = "index.html";
        }
    })
}   

