$(document).ready(function(){

    let id = sessionStorage.getItem("currentplan");
    if (id == null) {
        console.log("undefined plan");
        window.location.href = '/landingpage';
    }
    console.log(id);
    console.log(sessionStorage.getItem("currentUser"));
    //let userName = await getName(sessionStorage.getItem("currentUser"));
    //sessionStorage.setItem("currentUserName") = userName;

    $('.search-bar').on('keypress',function(e) {
        if(e.which == 13) {
            let currentSearch = sessionStorage.setItem("currentSearch", $(".search-bar").val());
            window.location = "search";
        }
    });

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


    async function getPlan(plan_id) {
        let currentUser = sessionStorage.getItem("currentUser");
        let url = "http://127.0.0.1:5000/get_plan?email=" + currentUser + "&" + 
            "plan_id=" + plan_id;
        
        const response = await fetch(url);
        //console.log(url);
        var data = await response.json();
        //console.log(data);
        showData(data.data)

        let urlcom = "http://127.0.0.1:5000/get_comments?plan_id=" + plan_id;
        const responsecom = await fetch(urlcom);
        //console.log(url);
        var datacom = await responsecom.json();
        console.log(datacom);
        console.log("type?:" + typeof(datacom.data));
        showComments(datacom.data)
        
    }
    getPlan(id)

    function showData(data) {
        document.getElementById('plan-name').innerHTML = data.title;
        document.getElementById('school-name').innerHTML = data.school;

        document.getElementById('major_name').innerHTML = data.major;
        document.getElementById('description').innerHTML = data.description;
        document.getElementById('author-name').innerHTML = data.author_name;
        document.getElementById('tags').innerHTML = data.tags;
        document.getElementById('likes').innerHTML = data.likes;
        document.getElementById('comments').innerHTML = data.comments;

        // alert(data.semester_classes)
        const keys = data.semester_classes;
    
        for (let i = 0; i < keys.length; i++) {
            const title = keys[i]["title"];
            let table = ''
            table += `<div id="tableline"><text>${title}</text> 
                <table>
                  <tr>
                    <th>Class</th>
                    <th>Reason</th> 
                  </tr>`

            const innerkey = keys[i]["classes"];
            for(let j = 0; j < innerkey.length; j++) {
                const c = innerkey[j]["Class"]
                const r = innerkey[j]["Reason"]
                //console.log(c + " " + r)
                table += `<tr>
                    <td><input type="text" class="table-entry">${c}</td>
                    <td><input type="text" class="table-entry"/>${r}</td> 
                    </tr>`
            }
            table += `</table></div>`
            document.getElementById('semester-row').innerHTML += table;
        }

        document.getElementById("likeInteraction").addEventListener("click", toggleLike)
        //alert(table)
        
    }

    
    async function showComments(data) {
        console.log("coms: " + comments);   
        const keys = Object.keys(data);
        console.log("keys: " + keys);
        
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            console.log(data[key]);
            let name = await getName(data[key].author_email);
            let comment = ''
            comment += `
                <div class="comment">${data[key].text}</div>
                
                <div class="comment-author">${name}</div><hr>`;

            document.getElementById('prev-comments').innerHTML += comment;
        }

    }

    function getJsonData(text) {
        plan_id = id;
        text = text;
        let currentUser = sessionStorage.getItem("currentUser");
        var jsonData = {};
        jsonData["email"] = currentUser;
        jsonData["plan_id"] = id;
        jsonData["text"] = text;

        postComment(jsonData);
    }


    async function toggleLike() {

        let currentUser = sessionStorage.getItem("currentUser");
        jsonData = {}
        jsonData["email"] = currentUser
        jsonData["plan_id"] = id
        let url = "http://127.0.0.1:5000/toggle_like_plan"

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
      
        let planurl = "http://127.0.0.1:5000/get_plan?email=" + currentUser + "&" + 
            "plan_id=" + id;
        
        const planresponse = await fetch(planurl);
        console.log(planurl);
        var plandata = await planresponse.json();
        console.log(plandata);
        
        var x = plandata.data.likes
        document.getElementById('likes').innerHTML = x;
        alert("purr")
    }
  
    async function postComment(jsonData){
      const url = `http://127.0.0.1:5000/comment_plan`;
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
                console.log("new comment " +data );
                displayNewComment(data);
            } else {
                alert("Your comment could not be posted. Please try again.")
            }
        }, (error) => {
            console.log('There was a problem with the request:', error);
            alert("Your comment could not be posted. Please try again.")
        })
    }
  

    async function displayNewComment(data){
        let name = await getName(data.data.email);
        let comment = ''
        comment += `
            <div class="comment">${data.data.text}</div>
            
            <div class="comment-author">${name}</div>`;
        document.getElementById('prev-comments').innerHTML += comment;
    }

    

    // post comment
    $('.comment-input-box').on('keypress',function(e) {
        console.log("fkbnkjdfk")
        if(e.which == 13) {
            let comment = $(this).val();
            getJsonData(comment);
        }
    });


        

})

// document.addEventListener("DOMContentLoaded", init);