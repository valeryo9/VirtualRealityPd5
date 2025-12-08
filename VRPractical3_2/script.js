let scene;


window.addEventListener("DOMContentLoaded",function() {
  scene = document.querySelector("a-scene")


      
  loop();
})

function loop(){

    
  window.requestAnimationFrame(loop);
}