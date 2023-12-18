$(document).ready(function(){

    function addTable(){
        
        const container = document.getElementById("tableline");
        const elementToClone = document.getElementById("original-table");
        const clonedElement = elementToClone.cloneNode(true);
        container.appendChild(clonedElement);
    }

    var form = document.getElementById("makeplan");

    async function submitPlan(e){

        e.preventDefault();
    
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
        
        let email = currentUser
        let name = await getName(currentUser)
        console.log(iname)
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

        if (!(iname && icollege && imajor && istart && tbls && idesc && name && email &&itags)){
            alert("Please make sure all fields are filled out.")
            return
        }
        postJson(jsonData)
        
    }


    async function postJson(jsonData){

        const url = `http://127.0.0.1:5000/make_plan`;
        
            fetch(url, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonData)
            })
            .then((response) =>  {
                return response.json()
                
            })
            .then((data) => {
                if ("success" in data) {
                    const planid = data.data.$oid

                    sessionStorage.setItem("currentplan", planid);
                    window.location = "viewplan";
                } else {
                    alert("Your plan could not be created. Please try again.")
                }
            }, (error) => {
                console.log('There was a problem with the request:', error);
                alert("Your plan could not be created. Please try again.")
            })
    }

    async function getName(currentUser) {
        if(currentUser == null) {
            return "none"
        }
        let url =
            "http://127.0.0.1:5000/user_profile?email=" + currentUser;

        const response = await fetch(url);

        var data = await response.json();
        return data.data.name
    }

    form.addEventListener('submit', submitPlan);

})