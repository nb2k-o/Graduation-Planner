$(document).ready(function(){

    let id = sessionStorage.getItem("currentplan");
    if (id == null) {
        console.log("undefined plan");
        window.location.href = '/landingpage';
    }


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

        var data = await response.json();

        showData(data.data)

        let urlcom = "http://127.0.0.1:5000/get_comments?plan_id=" + plan_id;
        const responsecom = await fetch(urlcom);

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

        console.log(data.comments)
        // alert(data.semester_classes)
        const keys = data.semester_classes;
    
        for (let i = 0; i < keys.length; i++) {
            const title = keys[i]["title"];
            let table = ''
            table += `<div id="tableline"><text>${title}</text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div>
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
                    <td><input type="text" name="class-entry" >${c.trim()}&nbsp;</td>
                    <td><textarea maxlength=150 type="text" name="reason-entry" readonly>${r.trim()}</textarea></td>
                    </tr>`
            }
            table += `</table></div>`
            document.getElementById('semester-row').innerHTML += table;
        }       
        
    }

    async function deleteComment(comment_id) {
        let url = "http://127.0.0.1:5000/remove_comment/" + id + "/" + comment_id;
        // Storing response
        const response = await fetch(url,{ 
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
              },
        }).then(response => {
            
            if(response.ok){
                return response.json()
            }

            else{
                Promise.reject(response)
            }
        
        })
        .then(data => {
          if ("success" in data) {
            window.location.reload()
          } else {
            console.log(data)
            alert("We could not delete your comment. Please try again");
          }
        },
        (error) => {
            console.log('There was a problem with the request:', error);
            alert("An error occured. Please try again later.");
        });
    }

    
    async function showComments(data) {
        
        const keys = Object.keys(data);
      
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];

            let name = await getName(data[key].author_email);
            let comment = ''

            if(data[key].author_email == sessionStorage.getItem("currentUser")){
                comment += `
                <button class="delete-plan-button" id=${data[key]._id}>Delete</button>
                <div class="comment">${data[key].text}</div>
                <div class="comment-author">${name}</div><hr>
                `;

            }else{
                comment += `
                    <div class="comment">${data[key].text}</div>
                    
                    <div class="comment-author">${name}</div><hr>`;
            }
            document.getElementById('prev-comments').innerHTML += comment;
        }

        $(".delete-plan-button").click(function (e) {
            e.stopPropagation()
            deleteComment($(this).attr('id'))
        })

    }

    function getJsonData(text) {
        plan_id = id;
        text = text;
        let currentUser = sessionStorage.getItem("currentUser");
        var jsonData = {};
        jsonData["email"] = currentUser;
        jsonData["plan_id"] = id;
        jsonData["text"] = text;

        if(text == ""){
            return
        }
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
            
            let planurl = "http://127.0.0.1:5000/get_plan?email=" + currentUser + "&" + 
            "plan_id=" + id;
            
            

            fetch(planurl).then(planresponse => planresponse.json()).then((plandata) => { 
                var x = plandata.data.likes
                console.log(x)
                document.getElementById('likes').innerHTML = x;
            })

            return response.json()
        })
       
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

        document.getElementById('make-comment').value = ""
    }
  

    async function displayNewComment(data){
        let name = await getName(data.data.email);
        let comment = ''
        console.log(data.data)
        comment += `
            <button class="delete-plan-button" id=${data.data._id}>Delete</button>

            <div class="comment">${data.data.text}</div>
            
            <div class="comment-author">${name}</div><hr>`;

        document.getElementById('prev-comments').innerHTML += comment;

        $(".delete-plan-button").click(function (e) {
            deleteComment($(this).attr('id'))
        })
    }

    // post comment
    $('.comment-input-box').on('keypress',function(e) {
        if(e.which == 13) {
            let comment = $(this).val();
            getJsonData(comment);
        }
    });

    document.getElementById("likeInteraction").addEventListener("click", toggleLike)
        

})

// document.addEventListener("DOMContentLoaded", init);