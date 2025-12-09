window.addEventListener("DOMContentLoaded", function() {
  let myBox = document.querySelector("#myBox");
  // Task 3: Create a variable for the cylinder. Get the element from the HTML
  let myCylinder = document.querySelector("#myCylinder");

  myBox.addEventListener("mouseenter", function() {
    this.setAttribute("height", 1.5);
  });

  // Task 4: Add another event to set the height of myBox back to 1 when the mouse is no longer on myBox
  myBox.addEventListener("mouseleave", function() {
    this.setAttribute("height", 1);
  });

  // Task 5: Make the cylinder disappear when you click on it. Set opacity to zero
  myCylinder.addEventListener("click", function() {
    this.setAttribute("opacity", 0);
  });
});
