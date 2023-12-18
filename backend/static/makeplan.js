$(document).ready(function(){

    var form = document.getElementById("makeplan");
    let count = 1

    function addTable(){

        let istart = document.getElementById('starts').value;

        if (count > 8-istart){
          
            alert(`You can only add ${9-istart} semester(s).`)
            return
        }  else if (istart == "null"){
            alert(`Please fill in the starting semester.`)
            return
        }
        const container = document.getElementById("tableline");
        const elementToClone = document.getElementById("original-table");
        const clonedElement = elementToClone.cloneNode(true);

        var InputType = clonedElement.getElementsByTagName("textarea");

        for (var i=0; i<InputType.length; i++){
         if( InputType[i].type=='checkbox'){
            InputType[i].checked = false;  
        }else{
           InputType[i].value='';               
            }
        }

        container.appendChild(clonedElement);
        count += 1
    }

    async function submitPlan(e){

        e.preventDefault();
    
        semesters = ["0 index", "Freshman Fall", "Freshman Spring", "Sophomore Fall", "Sophomore Spring", "Junior Fall", "Junior Spring", "Senior Fall", "Senior Spring"]
        
        let iname = document.getElementById('plan-form').value;
        let itags = document.getElementById('tag').value;
        let idesc = document.getElementById('desc-inp').value;
        let icollege = document.getElementById('colleges').value;
        let imajor = document.getElementById('majors').value;
        let istart = document.getElementById('starts').value;

        var tbls = []
        let elms = document.getElementsByName("class-table");
        
        for(var i = 0; i < elms.length; i++) {
            let vals = elms.item(i);
            let cla = vals.getElementsByTagName("input"); 
            let cla_reason = vals.getElementsByTagName("textarea");
            var thissem = []
            for (var j = 0; j < cla.length; j++){
                var c = {}
                c["Class"] = cla[j].value
                c["Reason"] = cla_reason[j].value
                thissem.push(c)
            }
            let semind = parseInt(istart) + i
            let full_sem = {"title":semesters[semind], "classes":thissem}
            tbls.push(full_sem)
        }
        
        let currentUser = sessionStorage.getItem("currentUser");
        
        let email = currentUser
        let name = await getName(currentUser)
        var jsonData = {}
        jsonData["title"] = iname
        jsonData["school"] = icollege
        jsonData["major"] = imajor
        if (tbls.length == 1){
            jsonData["semesters"] = semesters[parseInt(istart)]
        }
        else{
            let sem_num = parseInt(istart) + tbls.length
            jsonData["semesters"] = semesters[parseInt(istart)] + " - " + semesters[sem_num]
        }
        jsonData["semester_classes"] = tbls
        jsonData["description"] = idesc
        jsonData["author_name"] = name
        jsonData["author_email"] = email
        jsonData["tags"] = itags

        if (!(iname && icollege != "null" && imajor != "null" && istart != "null" && tbls && idesc && name && email &&itags)){
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
    document.getElementById('plus').addEventListener('click', addTable)

})