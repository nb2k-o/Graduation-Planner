

const init = function(){
    
    document.getElementById('submit').addEventListener('click', submitPlan(form))
    document.getElementById('plus').addEventListener('click', addTable())
    
}

function addTable(){
    
    const container = document.getElementById("tableline");
    const elementToClone = document.getElementById("original-table");
    const clonedElement = elementToClone.cloneNode(true);
    container.appendChild(clonedElement);
}


function submitPlan(form){
    semesters = ["Freshman Fall", "Freshman Spring", "Sophomore Fall", "Sophomore Spring", "Junior Fall", "Junior Spring", "Senior Fall", "Senior Spring"]
    
    let name = document.getElementById('plan-form').value;
    let tags = document.getElementById('tag').value;
    let desc = document.getElementById('desc-inp').value;
    let college = document.getElementById('colleges').value;
    let major = document.getElementById('majors').value;
    let start = document.getElementById('starts').value;

    var jsonData = {}
    jsonData["title"] = name
    jsonData["school"] = college
    jsonData["major"] = major
    jsonData["semesters"] = start

    var tbls = {}
    
    let elms = document.getElementsByName("class-table");
    
    for(var i = 0; i < elms.length; i++) {
        let vals = elms.item(i);

        let cla = vals.getElementsByTagName("input"); 

        var thissem = {}
        
        for (var j = 0; j < cla.length-1; j+=2){
            thissem[cla[j].value] = cla[j+1].value
        }
        let semind = parseInt(start) + i
        let sem = "extra semester"
        tbls[semesters[semind]] = thissem
        
    }
    jsonData["semester_classes"] = tbls

    jsonData["description"] = desc

    let currentUser = sessionStorage.setItem("currentUser");
    jsonData["author_name"] = currentUser.name
    jsonData["author_email"] = currentUser.email
    jsonData["tags"] = tags 

    
    //postJson(JSON.stringify(jsonData))

    alert(JSON.stringify(jsonData));
    
}

// function postJson(jsonData){
//     let url = "http://127.0.0.1:5000/make_plan";

//     fetch(url, {
//         headers : {
//             'Content-Type' : 'application/json'
//         },
//         method : 'POST',
//         body : jsonData
//     })
//     .then(function (response){

//         if(response.ok) {
//             response.json()
//             .then(function(response) {
//                 alert(response)
//                 console.log(response);
//             });
//         }
//         else {
//             alert(response)
//             throw Error('Something went wrong');
//         }
//     })
//     .catch(function(error) {
//         alert(error)
//         console.log(error);
//     });

// }

document.addEventListener("DOMContentLoaded", init);