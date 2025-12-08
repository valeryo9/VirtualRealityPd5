let scene;
let clone, mech;
window.addEventListener("DOMContentLoaded",function() {
  scene = document.querySelector("a-scene");  
  mech = document.getElementById("mech-1");
  clone = mech.cloneNode(true);
  clone.setAttribute("position",{x:2,y:13,z:-3});
  scene.append(clone);

  let m1 = new Mech(0,13,-10);
 
  loop();
})
function loop(){
  setTimeout(loop,10);


  window.requestAnimationFrame( loop );
}
