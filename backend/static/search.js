$(document).ready(function(){
    
    let currentSearch = sessionStorage.getItem("currentSearch");
    console.log(currentSearch);
    if (currentSearch){
        $(".search-bar").val(currentSearch);
        getSearchApi(currentSearch);
        sessionStorage.setItem("currentSearch", null);
    }

    async function getSearchApi(search_term, sort_by, school_filter, major_filter) {
        let url =
            "http://127.0.0.1:5000/search_plans?query_term=" + search_term + "&";
        if (sort_by) {
            url += "sort_by=" + sort_by + "&";
        }
        else {
            url += "sort_by=popular&";
        }
        if (school_filter) {
            url += "school=" + school_filter+ "&";
        }
        if (major_filter) {
            url += "major=" + major_filter;
        }
        // Storing response
        const response = await fetch(url);
        console.log(url);

         // Storing data in form of JSON
         var data = await response.json();
         console.log(data);
         let results_count = '';
         if (response) {
            let response_length = data.data.length;
            console.log("length" + response_length);
            let max_results_pp = Math.min(response_length, 6);
            results_count += `<span>1-${max_results_pp} of ${response_length} results for \"${search_term}\"</span>`;
         }
         else {
            results_count += `<span>0 results for \"${search_term}\"</span>`;
         }

         document.getElementById("results-text").innerHTML = results_count;
         showPlan(data.data);
    }
    

    // Function to define innerHTML for HTML table
    function showPlan(data) {
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


    function updateSearch() {
        var str = $(".search-bar").val();
        var school = ($(".dropdown1").val() == "null") ? undefined : $(".dropdown1").val();
        var major = ($(".dropdown2").val() == "null") ? undefined : $(".dropdown2").val();
        var sort = ($(".sort-dropdown").val() == null) ? "popular" : $(".sort-dropdown").val();
        getSearchApi(str, sort, school, major);
    }

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
    
    $(".dropdown1").change(function(){
        updateSearch();
        
      })

      $(".dropdown2").change(function(){
        updateSearch();
      })
      $(".sort-dropdown").change(function(){
        updateSearch();
      })

      $(".close-sidebar-button").click(function() {
        document.getElementById("mySidebar").style.display = "none";
      })

      $(".menu-button").click(function() {
        document.getElementById("mySidebar").style.display = "block";
      })

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

    generateOptions(info,"dropdown2" )

})
