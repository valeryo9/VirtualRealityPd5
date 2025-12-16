let scene;
let clone, mech;
window.addEventListener("DOMContentLoaded",function() {
  scene = document.querySelector("a-scene");  
  // mech initialization is handled by mech.js (it clones the template and creates an army)

loop();
})
function loop(){
  setTimeout(loop,10);


  window.requestAnimationFrame( loop );
}
