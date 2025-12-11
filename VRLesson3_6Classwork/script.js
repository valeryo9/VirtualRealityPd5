let rnd = (l,u) => Math.random() * (u-l) + l
let scene, camera, balls = [];

window.addEventListener("DOMContentLoaded",function() {
  scene = document.querySelector("a-scene");
  camera = document.querySelector("a-camera");
  gem = document.getElementById("gem");


  /*
    Challenge 1
    Add an eventlistener that associates user pressing the keys with the following actions.
    1) Rotate the gem in the positively on the z-axis
    2) Rotate the gem in the negatively on the z-axis
    3) Rotate the gem in the positively on the x-axis
    4) Rotate the gem in the negatively on the x-axis
    5) Rotate the gem in the positively on the y-axis
    6) Rotate the gem in the negatively on the y-axis
    Note: Copy and paste!
  */
  window.addEventListener("keydown", function(e) {
    let r = gem.getAttribute("rotation");
    if(e.key == "q") {
      r.z += 5;
    }
    if(e.key == "a") {
      r.z -= 5;
    }
    if(e.key == "w") {
      r.x += 5;
    }
    if(e.key == "s") {
      r.x -= 5;
    }
    if(e.key == "e") {
      r.y += 5;
    }
    if(e.key == "d") {
      r.y -= 5;
    }
    gem.setAttribute("rotation", r);
  });

  /*  Challenge 2
     When the user clicks in the window, resets the gem rotation to (0,0,0)
  */ 
  window.addEventListener("click", function(e) {
    gem.setAttribute("rotation", {x:0, y:0, z:0});
  });
})
