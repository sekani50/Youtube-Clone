///////////////////////////////////menu button clicks/////////////////////////////////

menuFunction();

function menuFunction() {
 

  menu.addEventListener("click", () => {
    console.log("b4 if");

   
    if (leftIcons.style.display !== "none") {
      //console.log("inside if");
      horiz_parent.style.width = "90%";
      leftIcons.style.display = "none";
      smallLeft.style.display = "block";
     

     
    } else {
      console.log("inside else");
      leftIcons.style.display = "block";
      smallLeft.style.display = "none";
      horiz_parent.style.width = "80%";
      

     
    }

    if (window.innerWidth <= 1289) {
      console.log("inside else");
      leftIcons.style.display = "block";
      smallLeft.style.display = "none";
      horiz_parent.style.width = "80%";
    }
  });
}
let menuInLeftIcons = document.querySelector(".menu-in-left-icons");
menuInLeftIcons.addEventListener("click", () => {
  if (leftIcons.style.display === "block") {
    leftIcons.style.display = "none";
    smallLeft.style.display = "block";
    horiz_parent.style.width = "90%";
  }
});