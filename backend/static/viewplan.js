//$(document).ready(function(){
//{"title":"","school":"null","major":"null","start_semester":"1","semester_classes":
//{"Freshman Spring":{"A":"b","c":"d","e":"f","g":"h","i":"j"},
//"Sophomore Fall":{"k":"l","m":"n","o":"p","q":"r","s":"t"}},"description":"","author_name":"null","author_email":"null","tags":""}
    // async function getPlan(email, plan_id) {
    //     let currentUser = sessionStorage.getItem("currentUser");
    //     let url = "http://127.0.0.1:5000/get_plan?email=" + currentUser + "&" + 
    //         "plan_id=" + plan_id;
        
    //     const response = await fetch(url);
    //     console.log(url);
    //     var data = await response.json();
    //     console.log(data);
    //     showData(data)

    //     let urlcom = "http://127.0.0.1:5000/get_comments?plan_id=" + plan_id;
    //     const responsecom = await fetch(urlcom);
    //     console.log(url);
    //     var datacom = await responsecom.json();
    //     console.log(datacom);
    //     showComments(datacom)
        
    // }

    const init = function(){
        data = {
            "title": "Chill first year",
            "school": "Columbia College",
            "major": "Computer Science",
            "description": "This is a chill plan for first years",
            "author_name": "Nigel K.",
            "tags": "#fun #great",
            "likes": 7,
            "comments": 2,
            "semester_classes": {
                "Freshman Fall": {"Java":"CS", "LitHum":"Core", "UW": "Core", "UW": "Core", "UW": "Core"}, 
                "Freshman Spring": {"Data Structures":"CS", "LitHum":"Core", "UW": "Core", "UW": "Core", "UW": "Core"}
            }

        }
        showData(data)

        comments = {
            "Miira E": "This plan was so great for my freshman year",
            "Ola O": "This plan gave me time to apply to clubs and internships"
        }
        showComments(comments)
        
    }

    function showData(data) {
        document.getElementById('plan-name').innerHTML = data.title;
        document.getElementById('school-name').innerHTML = data.school;

        document.getElementById('major_name').innerHTML = data.major;
        document.getElementById('description').innerHTML = data.description;
        document.getElementById('author-name').innerHTML = data.author_name;
        document.getElementById('tags').innerHTML = data.tags;
        document.getElementById('likes').innerHTML = data.likes;
        document.getElementById('comments').innerHTML = data.comments;

        //alert(data.semester_classes)
        const keys = Object.keys(data.semester_classes);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            
            let table = ''
            table += `<div id="tableline"><text>${key}</text> 
                <table>
                  <tr>
                    <th>Class</th>
                    <th>Reason</th> 
                  </tr>`

            const innerkey = Object.keys(data.semester_classes[key]);
            for(let j = 0; j < innerkey.length; j++) {
                const inkey = innerkey[j]
                table += `<tr>
                    <td><input type="text" id="table-entry">${inkey}</td>
                    <td><input type="text" id="table-entry"/>${data.semester_classes[key][inkey]}</td> 
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
        
        alert(comment)

    }

//})

document.addEventListener("DOMContentLoaded", init);