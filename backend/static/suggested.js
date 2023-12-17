$(document).ready(function () {
    sessionStorage.setItem("currentUser", "ooo2139@columbia.edu");
    let currentUser = sessionStorage.getItem("currentUser");
    console.log(currentUser);

    async function getSuggestedPlans(){
        let url =
        "http://127.0.0.1:5000/primary_suggested_plans?email=" + currentUser;

        // Storing response
        const response = await fetch(url);

        // Storing data in form of JSON
        var data = await response.json();
        console.log(data);
        if (response) {
            displaySuggestedPlans(data.data.plans);
        }
        else{
            document.getElementById("search-body").innerHTML = `<span>Error</span>`;
        }
    }

    function displaySuggestedPlans(data) {
        console.log(data);
        console.log(" length: ");
        console.log(data.length);
        let plans = ''
        for (let r of data) {  // NEED TO ADD LINK TO PLAN PAGE
            plans += `<div class="singleplan"> <a href="">   
            <div class="sort-results-header">
                <h4>${r.title}</h4>
                <h7>${r.author_name}</h7>
            </div>
            <br>
            <div class="plan-info">
                <div class="menu-item">${r.school}</div>
                <div class="menu-item">${r.major}</div>
                <div class="menu-item">${r.semesters}</div>
            </div>
            <h5>Description...</h5>
            <br>
            <div class="description-box"> ${r.description}
            </div>
            <div class="images-container">
                    <div class="counts"><img class="images" src="../static/heart.png"/> 
                        <div class="count">${r.likes}</div></div>
                    
                        <div class="counts"><img class="images" src="../static/comment.png"/> <div class="count">${r.comments}</div> </div>
                </div>
            <br>
            <div class="tags-group">
                <div class="tags"> <a href="">${r.tags}</a></div>
            </div>
        </div>
        <br>`;
        }
        
        document.getElementById("search-body").innerHTML = plans;
    }

    getSuggestedPlans();
})
