$(document).ready(function () {
    let currentUser = sessionStorage.setItem("currentUser", "ooo2139@columbia.edu");
    console.log(currentUser);
    window.location.href = "profile.html";
})