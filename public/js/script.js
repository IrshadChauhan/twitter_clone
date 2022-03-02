// let sidebarOptions = document.getElementsByClassName("sidebarOption");
// console.log(Array.from(sidebarOptions));

// Array.from(sidebarOptions).forEach((e) => {
//   e.addEventListener("click", (e) => {
//     console.log(e);
//     e.classList.add("active");
//     // console.log("clicked");
//   });
// });
// // console.log(Array.from(sidebarOptions));

var sidebarOptions = document.querySelectorAll(".sidebarOption");
console.log(sidebarOptions);

sidebarOptions.forEach((el) => {
  el.addEventListener("click", (e) => {
    console.log(e.target);
    e.classList.add("active");
    console.log("clicked");
  });
});

window.onload(e => {
  localStorage.setItem("token", document.getElementById("token").value);
})