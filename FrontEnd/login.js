//CONSTANTES
const BASE_URL = "http://localhost:5678/api/"
const USERS_API = BASE_URL+"users/login";
const LOGIN_BUTTON = document.getElementById("se_connecter")

// AJOUT D'UN EVENEMENT AU CLIC POUR SE CONNECTER
LOGIN_BUTTON.addEventListener("click", function() {
    login_user();
});

function login_user(){
    let user = {
        email: 'sophie.bluel@test.tld',
        password: 'S0phie'
    };

    fetch (USERS_API,{
        method: 'POST',
        headers: {
             'Content-Type': 'application/json;charset=utf-8'
         },
          body: JSON.stringify(user)
    })
    .then (reponse => console.log(reponse))
}   
