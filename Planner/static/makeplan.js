$(document).ready(function(){

    var form = document.getElementById("makeplan");
    let count = $('[name=class-table]').length

    function addTable(){

        let istart = document.getElementById('starts').value;

        if (count > 8-istart){
          
            alert(`You can only add ${9-istart} semester(s) to your plan.`)
            return
        }  else if (istart == "null"){
            alert(`Please fill in the starting semester.`)
            return
        }
        const container = document.getElementById("tableline");
        const elementToClone = document.getElementById("original-table");
        const clonedElement = elementToClone.cloneNode(true);

        var InputType = clonedElement.getElementsByTagName("textarea");
        var InputType2 = clonedElement.getElementsByTagName("input");

        for (var i=0; i<InputType.length; i++){
         if( InputType[i].type=='checkbox'){
            InputType[i].checked = false;  
        }else{
           InputType[i].value='';               
            }
        }

        for (var i=0; i<InputType2.length; i++){
            if( InputType2[i].type=='checkbox'){
               InputType2[i].checked = false;  
           }else{
              InputType2[i].value='';               
               }
        }

        container.appendChild(clonedElement);
        count = $('[name=class-table]').length
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

        if (count-1 >  8-istart){
            alert(`You can only add ${9-istart} semester(s) to your plan.`)
            return
        }

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
    
    $('.search-bar').on('keypress',function(e) {
        if(e.which == 13) {
            let currentSearch = sessionStorage.setItem("currentSearch", $(".search-bar").val());
            window.location = "search";
        }
    });

    function generateOptions(data,name) {
        const select = document.getElementById(name);

        const options = data.map(ele => {
        const option = document.createElement('option');
        option.value = ele;
        option.text = ele;
        return option;
        });

        // Append generated options to the select element
        options.forEach(option => {
        select.appendChild(option);
        });
    }


  // Call the function with the array to generate options
  const info = ["African American & African Diaspora Studies",
      "American Studies",
      "Ancient Studies",
      "Anthropology",
      "Applied Mathematics",
      "Applied Physics and Applied Mathematics	",
      "Archaeology",
      "Architecture",
      "Art History",
      "Art History & Visual Arts",
      "Astronomy",
      "Astrophysics",
      "Biochemistry",
      "Biology",
      "Biomedical Engineering",
      "Biophysics",
      "Chemical Engineering	",
      "Chemical Physics",
      "Chemistry",
      "Civil Engineering and Engineering Mechanics",
      "Classical Studies",
      "Classics",
      "Climate System Science",
      "Cognitive Science",
      "Comparative Literature and Society",
      "Computer Engineering	",
      "Computer Science",
      "Computer Science - Mathematics",
      "Creative Writing",
      "Dance",
      "Data Science",
      "Drama and Theatre Arts",
      "Earth & Environmental Engineering	",
      "Earth Science",
      "East Asian Studies",
      "Economics",
      "Economics - Mathematics",
      "Economics - Philosophy",
      "Economics - Political Science",
      "Economics - Statistics",
      "Electrical Engineering",
      "Engineering Mechanics	",
      "English",
      "Environmental Biology",
      "Environmental Chemistry",
      "Environmental Science",
      "Ethnicity and Race Studies",
      "Evolutionary Biology of the Human Species",
      "Film and Media Studies",
      "Financial Economics",
      "French",
      "French & Francophone Studies",
      "German Literature & Cultural History",
      "Hispanic Studies",
      "History",
      "History and Theory of Architecture",
      "Human Rights",
      "Industrial Engineering and Operations Research",
      "Information Science",
      "Italian",
      "Latin American and Caribbean Studies",
      "Linguistics",
      "Materials Science and Engineering	",
      "Mathematics",
      "Mathematics - Statistics",
      "Mechanical Engineering",
      "Medical Humanities",
      "Middle Eastern, South Asian & African Studies",
      "Music",
      "Neuroscience & Behavior",
      "Operations Research: Engineering Management Systems",
      "Operations Research: Financial Engineering",
      "Philosophy",
      "Physical Education",
      "Physics",
      "Political Science",
      "Political Science - Statistics",
      "Portuguese Studies",
      "Psychology",
      "Regional Studies",
      "Religion",
      "Russian Language & Culture",
      "Russian Literature & Culture",
      "Slavic (Non-Russian) Language and Culture",
      "Slavic Studies",
      "Sociology",
      "Statistics",
      "Sustainable Development",
      "Urban Studies",
      "Visual Arts",
      "Women's & Gender Studies",
      "Yiddish Studies"];

    generateOptions(info,"majors" )   

})