$(document).ready(function(){

    let id = sessionStorage.getItem("currentplan");
    if (id == null) {
        console.log("undefined plan");
        window.location.href = '/landingpage';
    }
    console.log(id);

    async function getPlan(plan_id) {
        let currentUser = sessionStorage.getItem("currentUser");
        let url = "http://127.0.0.1:5000/get_plan?email=" + currentUser + "&" + 
            "plan_id=" + plan_id;
        
        const response = await fetch(url);
        console.log(url);
        var data = await response.json();
        console.log(data);
        showData(data.data)

        let urlcom = "http://127.0.0.1:5000/get_comments?plan_id=" + plan_id;
        const responsecom = await fetch(urlcom);
        console.log(url);
        var datacom = await responsecom.json();
        console.log(datacom);
        showComments(datacom.data)
        
    }
    getPlan(id)


    // const init = function(){
    //     var id = sessionStorage.getItem('currentplan');
    //     // data = {
    //     //     "title": "Chill first year",
    //     //     "school": "Columbia College",
    //     //     "major": "Computer Science",
    //     //     "description": "This is a chill plan for first years",
    //     //     "author_name": "Nigel K.",
    //     //     "tags": "#fun #great",
    //     //     "likes": 7,
    //     //     "comments": 2,
    //     //     "semester_classes": {
    //     //         "Freshman Fall": {"Java":"CS", "LitHum":"Core", "UW": "Core", "UW": "Core", "UW": "Core"}, 
    //     //         "Freshman Spring": {"Data Structures":"CS", "LitHum":"Core", "UW": "Core", "UW": "Core", "UW": "Core"}
    //     //     }

    //     // }
    //     showData(data)
    //     comments = {
    //         "Miira E": "This plan was so great for my freshman year",
    //         "Ola O": "This plan gave me time to apply to clubs and internships"
    //     }
    //     showComments(comments)
    // }

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
            console.log(title)
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
                console.log(c + " " + r)
                table += `<tr>
                    <td><input type="text" class="table-entry">${c}</td>
                    <td><input type="text" class="table-entry"/>${r}</td> 
                    </tr>`
            }
            table += `</table></div>`
            document.getElementById('semester-row').innerHTML += table;
        }
        //alert(table)
        
    }

    function showComments(data) {

        const keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            
            let comment = ''
            comment += `
                <div class="comment">${data[key]}</div>
                
                <div class="comment-author">${key}</div>`;

            document.getElementById('prev-comments').innerHTML += comment;
        }
        
        // alert(comment)

    }

})

// document.addEventListener("DOMContentLoaded", init);