let carousel,balloon1,balloon2,surpriseBox;

window.addEventListener("DOMContentLoaded",function() {
  carousel = document.getElementById("carousel-arms");
  carousel.r = 0;
  carousel.dr = 1;
  /* Challenge 1: Make the carousel rotate only when the mouse is on it.  Hint: Manipulate a flag called "rotate" between true and false. 
   Two event listeners required. */
  
  balloon1 = document.getElementById("balloon1"); //blue
  balloon1.y = 5
  balloon1.dy = -0.05;
  /* Challenge 2: Make balloon1 fall when the user clicks on the balloon. Hint: Set a "flag" to true when the user clicks on balloon1 */
  
  surpriseBox = document.getElementById("surpriseBox"); //white box with red balloon
  /* Challenge 4: Make the red balloon "fly" up when you click on the surprise box.  
  Note: You are interacting with one object but animating another.  Not as hard as it sounds.  
  Set a flag for balloon2 upon the interaction with the surprisebox */

  balloon2 = document.getElementById("balloon2"); //red
  balloon2.y = 0.5
  balloon2.dy = 0.02;
  

  loop();
}) 

function loop(){
  if(carousel.rotate){
    carousel.r += carousel.dr;
    carousel.setAttribute("rotation",{x:0, y:0, z: carousel.r});
  }
  if(balloon1.fall){
    //Challenge 3: Add the animation to make the balloon fall.  Hint: Look at the HTML to find out the original x and z coordinates.
    
  }
  //Challenge 5: Add a decision that checks for the flag on balloon2.  If the flag is true, make balloon2 fly up. Hint: Look at the HTML to find out the original x and z coordinates.
  
  
  window.requestAnimationFrame( loop );
}


