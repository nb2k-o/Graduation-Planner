// $(document).ready(function(){

    // function init() {
    //     // var form = document.getElementById("makeplan");
    //     // document.getElementById("submit").addEventListener('click', submitPlan());
    //     // document.getElementById('plus').addEventListener('click', addTable())
    // }

    function addTable(){
        
        const container = document.getElementById("tableline");
        const elementToClone = document.getElementById("original-table");
        const clonedElement = elementToClone.cloneNode(true);
        container.appendChild(clonedElement);
    }


    function submitPlan(form){
        // form.preventDefault();
        semesters = ["Freshman Fall", "Freshman Spring", "Sophomore Fall", "Sophomore Spring", "Junior Fall", "Junior Spring", "Senior Fall", "Senior Spring"]
        
        let iname = document.getElementById('plan-form').value;
        let itags = document.getElementById('tag').value;
        let idesc = document.getElementById('desc-inp').value;
        let icollege = document.getElementById('colleges').value;
        let imajor = document.getElementById('majors').value;
        let istart = document.getElementById('starts').value;

        var tbls = {}
        let elms = document.getElementsByName("class-table");
        
        for(var i = 0; i < elms.length; i++) {
            let vals = elms.item(i);
            let cla = vals.getElementsByTagName("input"); 
            var thissem = []
            for (var j = 0; j < cla.length-1; j+=2){
                var c = {}
                c["Class"] = cla[j].value
                c["Reason"] = cla[j+1].value
                thissem += c
            }
            let semind = parseInt(start) + i
            tbls[semesters[semind]] = [thissem]   
        }
        
        let currentUser = sessionStorage.getItem("currentUser");
        let name = "Ola O."
        // if(currentUser != null)
        //     name = getName(currentUser)
        let email = "ooo2139@columbia.edu"

        
        var jsonData = {}
        jsonData["title"] = iname
        jsonData["school"] = icollege
        jsonData["major"] = imajor
        jsonData["semesters"] = istart
        jsonData["semester_classes"] = '[' + JSON.stringify(tbls) + ']'
        jsonData["description"] = idesc
        jsonData["author_name"] = name
        jsonData["author_email"] = email
        jsonData["tags"] = itags

        
        // var jsonData = JSON.stringify({
        //     title: iname,
        //     school: icollege,
        //     major: imajor,
        //     semesters: istart,
        //     semester_classes: JSON.stringify(tbls), 
        //     description: idesc,
        //     // author_name: currentUser.name,
        //     // author_email: currentUser.name,
        //     itags
        // })
        postJson(jsonData)
        //alert(JSON.stringify(jsonData))
        
    }


    async function postJson(jsonData){

        data = {
            "title": "Chill first year",
            "school": "Columbia College",
            "major": "Computer Science",
            "semesters": "Semesters 1-2",
            "semester_classes":[ { 
                "title": "Freshman Fall", 
                "classes": [
                {
                    "Class":"Java", 
                    "Reason":"CS"
                 }, 
                 {
                    "Class":"LitHum", 
                    "Reason":"Core"
                 }, 
                 {
                    "Class":"Fro Sci", 
                    "Reason":"Core"
                 }
                ]}, 
                {"title": "Freshman Spring", 
                "classes": [
                {
                    "Class":"Data Structures", 
                    "Reason":"CS"
                 }, 
                 {
                    "Class":"LitHum", 
                    "Reason":"Core"
                 }, 
                 {
                    "Class":"UW", 
                    "Reason":"Core"
                 }
                ]
            }
            
            ],
            "description": "This is a chill plan for first years",
            "author_name": "Nigel K.",
            "author_email": "ooo2139@columbia.edu",
            "tags": "#fun #great"
        }

        const url = `http://127.0.0.1:5000/make_plan`;
        
            fetch(url, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then((response) => {
                    // console.log(response.json() + "this is response")
                    response.json()
                })
                .then((data) => {
                    console.log(JSON.stringify(data))
                if ("success" in JSON.stringify(data)) {
                    console.log("success")
                    // id data["data"]
                    // window.location = "viewpage/" + email = 
                } else {
                    console.log("unsuccessful.");
                }
                }, (error) => {
                    console.log('There was a problem with the request:', error);
                })
    }

    async function getName(currentUser) {
        if(currentUser == null) {
            return "none"
        }
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
        return data.data.name
    }

    // document.addEventListener("DOMContentLoaded", init);

// })