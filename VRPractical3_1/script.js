let carousel,balloon1,balloon2,surpriseBox;

window.addEventListener("DOMContentLoaded",function() {
  carousel = document.getElementById("carousel-arms");
  carousel.r = 0;
  carousel.dr = 2;
  carousel.rotate = false;
  /* Challenge 1: Make the carousel rotate only when the mouse is on it. */
  carousel.addEventListener("mouseenter", function() {
    carousel.rotate = true;
  });
  carousel.addEventListener("mouseleave", function() {
    carousel.rotate = false;
  });
  
  balloon1 = document.getElementById("balloon1"); //blue
  balloon1.y = 5;
  balloon1.dy = -0.01;
  balloon1.fall = false;
  /* Challenge 2: Make balloon1 fall when the user clicks on the balloon. */
  balloon1.addEventListener("click", function() {
    balloon1.fall = true;
  });
  
  
  surpriseBox = document.getElementById("surpriseBox"); //white box with red balloon
  /* Challenge 4: Make the red balloon "fly" up when you click on the surprise box. */
  surpriseBox.addEventListener("click", function() {
    balloon2.fly = true;
  });


  balloon2 = document.getElementById("balloon2"); //red
  balloon2.y = 0.5;
  balloon2.dy = 0.01;
  balloon2.fly = false;
  

  loop();
}) 

function loop(){
  if(carousel.rotate){
    carousel.r += carousel.dr;
    carousel.setAttribute("rotation",{x:0, y:0, z: carousel.r});
  }
  if(balloon1.fall){
    //Challenge 3: Add the animation to make the balloon fall.
    balloon1.y += balloon1.dy;
    balloon1.setAttribute("position", {x: 5, y: balloon1.y, z: 0});
    
  }
  //Challenge 5: Add a decision that checks for the flag on balloon2. If the flag is true, make balloon2 fly up.
  if(balloon2.fly){
    balloon2.y += balloon2.dy;
    balloon2.setAttribute("position", {x: -2, y: balloon2.y, z: 0});
  }
  
  window.requestAnimationFrame( loop );
  
}


