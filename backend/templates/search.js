$(document).ready(function(){

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
    
    /** 
    function getSchoolFilter() {
        selectElement = 
              document.querySelector('.dropdown1');
        output = selectElement.value;
        document.querySelector('.output').textContent = output;
    }

    function getMajorFilter() {
        selectElement = 
              document.querySelector('.dropdown2');
        output = selectElement.value;
        document.querySelector('.output').textContent = output;
    }
    */

    function updateSearch() {
        var str = $(".search-bar").val();
        var school = ($(".dropdown1").val() == "null") ? undefined : $(".dropdown1").val();
        var major = ($(".dropdown2").val() == "null") ? undefined : $(".dropdown2").val();
        var sort = ($(".sort-dropdown").val() == null) ? "popular" : $(".sort-dropdown").val();
        getSearchApi(str, sort, school, major);
    }

    $("#search-b").click(function () {
        var str = $(".search-bar").val();
        getSearchApi(str);
    })
    $(".dropdown1").change(function(){
        updateSearch();
      })

      $(".dropdown2").change(function(){
        updateSearch();
      })
      $(".sort-dropdown").change(function(){
        updateSearch();
      })

})










