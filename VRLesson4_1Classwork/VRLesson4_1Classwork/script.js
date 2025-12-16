let rnd = (l,u) => Math.random() * (u-l) + l
let scene;
let ufos = [], robots = [];

window.addEventListener("DOMContentLoaded",function() {
  scene = document.querySelector("a-scene");
  camera = document.querySelector("a-camera");

  for(let i = 0; i < 20; i++){
    let x = rnd(-20,20);
    let y = rnd(5,20);
    let z = rnd(-20,20);
    let ufo = new UFO(x,y,z)
    ufos.push(ufo)
  }

  for(let i = 0; i < 10; i++){
    let x = rnd(-20,20);
    let z = rnd(-20,20);
    let robot = new Robot(x,0.5,z);
    robots.push(robot)
  }
  
  loop();
})

function loop(){
  for(let ufo of ufos){
    ufo.roam();
  }

  for(let robot of robots){
    robot.act();
  }
  
  setTimeout(loop,10);
}

