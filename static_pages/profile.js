$(document).ready(function () {
    let currentUser = sessionStorage.getItem("currentUser");
    if (currentUser == null){
        console.log("undefined");
        window.location.href = "landingpage.html"; //will change to login once that gets in static pages
    }
    console.log(currentUser);


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