$(document).ready(function () {
    let currentUser = sessionStorage.getItem("currentUser");
    if (currentUser == null) {
        console.log("undefined");
        window.location.href = "landingpage.html"; //will change to login once that gets in static pages
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
                    <button>Edit</button>
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

    // Function to define innerHTML for HTML table
    function showPlan(data) {
        console.log(data);
        let plans = ''
        for (let r of data) {
            plans += `<div class="singleplan">
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
                <div class="counts"><img class="images" src="icons/heart.png"/> 
                    <div class="count">${r.likes}</div></div>
                 
                    <div class="counts"><img class="images" src="icons/comment.png"/> <div class="count">${r.comments}</div> </div>
            </div>
            <br>
            <div class="tags-group">
                <div class="tags"> <a href="">${r.tags}</a></div>
            </div>
        </div>
        <br>`;
        }
        
        document.getElementById("plans-box").innerHTML = plans;


    }

    getProfileApi();
    getPlansApi("created_plans");


    /*     let score = 0;
        let downloadTimer;
        let spawnTimer;
        let moleTimeout
        const MIN = 500;
        const MAX = 3000;
    
        $(".button").click(function () {
            $("#gameOver").removeClass("visible");
            $("#gameOver").addClass("invisible");
            if (typeof downloadTimer !== 'undefined') {
                clearInterval(downloadTimer);
            }
            if (typeof spawnTimer !== 'undefined') {
                clearInterval(spawnTimer);
            }
            resetMoles();
            timeLeft = 20;
            score = 0;
            $("#score").html(score);
            $("#timer").html(timeLeft);
    
    
            downloadTimer = setInterval(function () {
                if (timeLeft <= 0) {
                    clearInterval(downloadTimer);
                    clearInterval(spawnTimer);
                    $(".mole").unbind('click');
                    $(".hole").unbind('click');
                    $("#timer").html(0);
                    $("#gameOver").removeClass("invisible");
                    $("#gameOver").addClass("visible");
    
                } else {
                    $("#timer").html(timeLeft);
                }
                timeLeft -= 1;
            }, 1000);
    
            playGame()
    
        })
    
        function resetMoles() {
            var moles = $(".mole");
            for (mole of moles) {
                toHole(mole);
            }
        }
    
        function toHole(mole) {
            $(mole).off('click');
            $(mole).removeClass("mole");
            $(mole).addClass("hole");
            $(mole).attr("src", "mole_hole_1.png");
        }
    
    
    
        function playGame() {
            var rand = randomTime();
    
            function randomize() {
                if (timer <= 0) {
                    clearInterval(spawnTimer);
                }
                selectMole();
                rand = randomTime();
                clearInterval(spawnTimer);
                spawnTimer = setInterval(randomize, rand);
            }
    
            spawnTimer = setInterval(randomize, rand);
            if (timer <= 0) {
                clearInterval(spawnTimer);
            }
        }
    
        function selectMole() {
            var holes = $(".hole");
            const idx = Math.floor(Math.random() * holes.length);
            const hole = holes[idx];
            spawnMole(hole)
            const randTime = randomTime();
            moleTimeout = setTimeout(function () {
                if (timeLeft > 0) {
                    toHole(hole);
                }
                else{
                    clearTimeout(moleTimeout);
                }
            }, randTime);
    
        }
    
        function randomTime() {
            return Math.round(Math.random() * (MAX - MIN) + MIN);
        }
    
        function spawnMole(to_mole) {
            $(to_mole).removeClass("hole");
            $(to_mole).addClass("mole");
            $(to_mole).attr("src", "mole_1.png");
            $(".mole").click(function () {
                toHole(this);
                score = score + 50;
                $("#score").html(score);
            })
    
    
        } */

})