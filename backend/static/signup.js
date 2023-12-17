$(document).ready(function(){

    var form = document.getElementById("signup");

    function signup(e) {

        e.preventDefault();
        
        const d_name = document.getElementById('d_name').value;
        const major = document.getElementById('major').value;
        const grad_year = document.getElementById('year').value;
        const school = document.getElementById('school').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        
        if(!isYearValid(grad_year)){
          const last = new Date().getFullYear()+4
          alert(`Your graduation year must be no later than ${last}.`)
          return
        }
        
        if(!validateEmail(email)){
          alert("Make sure your email is in the correct format.")
          return
        }

        if(password.length < 6){
          alert("Your password must be at least six characters.")
          return
        }
    
        const url = `http://127.0.0.1:5000/signup`;
    
        fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: d_name,
                major: major,
                grad_year: grad_year,
                school: school,
                email: email,
                password: password
            })
          })
            .then(response => response.json()
            )
            .then(data => {
                console.log(data)
              if ("success" in data) {
                sessionStorage.setItem("currentUser", email);
                window.location = "landingpage"
              } else {
                alert("User already exists. Please try with a different email.");
              }
            }, (error) => {
              alert('There was a problem with the request:', error);
            })
            
    }
    
    form.addEventListener('submit', signup);

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

    const validateEmail = (email) => {
      return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    };

    const isYearValid = (inputYear) => {

      const currentYear = new Date().getFullYear();
      const year = parseInt(inputYear, 10);
    
      if (!isNaN(year) && year <= currentYear+4) {
        return true; 
      } else {
        return false;
      }
    }


  // Call the function with the array to generate options
  const info = 
    {
      school: ["Columbia College", "Fu Foundation School of Engineering and Applied Science", "School of General Studies",
       "Barnard College"],
      major: ["African American & African Diaspora Studies",
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
      "Yiddish Studies"]
      
    };

    for (var k in info){
        generateOptions(info[k],k);
      }
  
})