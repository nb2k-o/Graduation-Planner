$(document).ready(function () {
    let currentUser = sessionStorage.getItem("currentUser");
    if (currentUser == null) {
        console.log("undefined");
        window.location.href = '/pages/login';
    }
    console.log(currentUser);

    async function getProfileApi() {
        let url =
            "http://127.0.0.1:5000/user_profile?email=" + currentUser;

        // Storing response
        const response = await fetch(url);

        // Storing data in form of JSON
        var data = await response.json();
        console.log(data);
        if (response) {
            hideloader("profileLoader");
        }
        showProfile(data.data);
    }

    // Function to hide the loader
    function hideloader(loaderId) {
        document.getElementById(loaderId).style.display = 'none';
    }

    function showProfile(data) {
        console.log(data.name);
        let profile_area =
            `        <div class="profile-title">
                <h2>${data.name}'s Profile</h2>
            </div>
            <div class="user-info-box">
                <ul>
                    <li>${data.major}</li>
                    <li>${data.school}</li>
                    <li>${data.grad_year}</li>
                </ul>
                <div class="bottom-center">
                </div>
            </div>
        `
        document.getElementById("page-top").innerHTML = profile_area;


    }

    $("#personaltab").click(function () {
        getPlansApi("created_plans");
    })

    $("#likedtab").click(function () {
        getPlansApi("liked_plans");
    })

    async function getPlansApi(plan_type) {
        let url =
            "http://127.0.0.1:5000/" + plan_type + "?email=" + currentUser;
        // Storing response
        const response = await fetch(url);

        // Storing data in form of JSON
        var data = await response.json();
        showPlan(data.data);
    }

    async function deletePlan(id) {
        let url = "http://127.0.0.1:5000/remove_plan/" + id;
        // Storing response
        const response = await fetch(url,{ 
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
              },
        }).then(response => {
            
            if(response.ok){
                return response.json()
            }

            else{
                Promise.reject(response)
            }
        
        })
        .then(data => {
          if ("success" in data) {
            window.location.reload()
          } else {
            alert("We could not delete your plan. Please try again");
          }
        },
        (error) => {
            console.log('There was a problem with the request:', error);
            alert("An error occured. Please try again later.");
        });
    }

    // Function to define innerHTML for HTML table
    function showPlan(data) {
        console.log(data);
        let plans = ''
        for (let r of data) {
            plans += `<div class="singleplan" id=${r._id}>
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

            </div><button class="delete-plan-button" id=${r._id}>Delete</button>
        </div> 
        <br>`;
        }
        
        document.getElementById("plans-box").innerHTML = plans;

        $("#plans-box .singleplan").click(function () {
            sessionStorage.setItem("currentplan", $(this).attr('id'));
            window.location = "viewplan";
        })

       
        $(".delete-plan-button").click(function (e) {
            e.stopPropagation()
            sessionStorage.setItem("currentplan", null);
            deletePlan($(this).attr('id'))
        })

    }

    getProfileApi();
    getPlansApi("created_plans");


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

    

})