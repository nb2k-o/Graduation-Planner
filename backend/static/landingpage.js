$(document).ready(function () {

    let currentUser = sessionStorage.getItem("currentUser");
    if (currentUser == null) {
        console.log("undefined");
        window.location.href = '/pages/login';
    }
    console.log(currentUser);

    async function getPopularPlans(){
        let url =
        "http://127.0.0.1:5000/popular_plans"

        // Storing response
        const response = await fetch(url);

        // Storing data in form of JSON
        var data = await response.json();
        console.log(data);
        if (response) {
            displayPopularPlans(data.data.plans);
        }
        else {
            document.getElementById("grid-container").innerHTML = `<span>Error</span>`;
        }
    }

    console.log(getPopularPlans());


    function displayPopularPlans(data){
        let plans = ''
        for (let i = 0; i < 4; i++) {
            plans += `<div class="grid-item"> 
            <div id="header"> 
                <div id="top">
                    <span class= "name">${data[i].title}</span>
                    <span class= "author">${data[i].author_name}</span>
                </div>
                
                <div>
                    <label class= "tags">${data[i].tags}</label>
                </div>
                <br>
                <div>
                    <label class= "likes"><img src="../static/heart.png" class="planicon">${data[i].likes}</label>
                    <label class= "comments"><img src="../static/comment.png" class="planicon">${data[i].comments}</label>
                </div>
            </div>
        </div>`;
        }
        document.getElementById("grid-container").innerHTML = plans;
    }

    
    $("#suggested-button").click(function () {
        window.location = "suggestedplans";
    })

    $("#profile-button").click(function () {
        window.location= "profile";
    })

    $("#search-b").click(function () {
        let currentSearch = sessionStorage.setItem("currentSearch", $(".search-bar").val());
        window.location = "search";
    })

    $('.search-bar').on('keypress',function(e) {
        if(e.which == 13) {
            let currentSearch = sessionStorage.setItem("currentSearch", $(".search-bar").val());
            window.location = "search";
        }
    });
    
    getPopularPlans();
    

})