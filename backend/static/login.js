$(document).ready(function(){

    var form = document.getElementById("login");

    function checkUser(e) {

        e.preventDefault();
    
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
    
        const url = `http://127.0.0.1:5000/login`;
    
        fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
          })
            .then(response => {
            
                if(response.ok){
                    return response.json()
                }

                else{
                    Promise.reject(response)
                }
            
            })
            .then(data => {
              if ("success" in data) {
                sessionStorage.setItem("currentUser", email);
                window.location = "landingpage"
              } else {
                alert("Your email or password is incorrect. Please try again.");
              }
            },
            (error) => {
                console.log('There was a problem with the request:', error);
                alert("An error occured. Please try again later.");
            })
    }
    
    form.addEventListener('submit', checkUser);
    
});



