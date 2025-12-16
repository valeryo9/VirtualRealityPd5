let rnd = (l,u) => Math.floor(Math.random()*(u-l) + l);
let scene, dudeTemplate;

window.addEventListener("DOMContentLoaded",function() {
  scene = document.querySelector("a-scene");
  dudeTemplate = document.querySelector("#dudeTemplate");

  // Challenge 4: Create an array of Dude instances at random locations.
  // We create persistent Dude objects (so they keep animating every frame)
  window.dudes = []; // keep global for debugging
  for (let i = 0; i < 10; i++) {
    let x = rnd(-5, 5);
    // start y between 1 and 2 so the jump bounds (1..2) make sense
    let y = 1 + Math.random();
    let z = rnd(-5, 5);
    let d = new Dude(x, y, z);
    window.dudes.push(d);
  }

  loop();  
})
function loop(){
  // Challenge 5: Make all the dudes jump by calling jump() on each instance.
  window.dudes.forEach(d => d.jump());

  window.requestAnimationFrame( loop );
}