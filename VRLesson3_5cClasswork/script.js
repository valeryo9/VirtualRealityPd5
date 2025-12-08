let rnd = (l,u) => Math.random() * (u-l) + l
let scene, camera, dart, blocks = [];

window.addEventListener("DOMContentLoaded",function() {
  scene = document.querySelector("a-scene");
  camera = document.querySelector("a-camera");

  window.onclick = ()=>{
    dart = new Dart();
  } 
  for(let i = 0; i < 20; i++){
    let x = rnd(-10,10);
    let z = rnd(-10,10);
    blocks.push(new Block(x,z));
  }
  setTimeout(loop,100);
})

function loop(){
  /* Challenge
     Traverse the blocks and call the shrink function.  
     If dart hits a block, set the blocks shot variable to true.
     Note: Explore the Block class for an understanding of the 
     above two tasks.
  */

  if(dart){
    dart.fly();
  }
  window.requestAnimationFrame(loop);
}

function distance(obj1,obj2){
  let x1 = obj1.object3D.position.x;
  let y1 = obj1.object3D.position.y;
  let z1 = obj1.object3D.position.z;
  let x2 = obj2.object3D.position.x;
  let y2 = obj2.object3D.position.y;
  let z2 = obj2.object3D.position.z;

  let d = Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2) + Math.pow(z1-z2,2));
  return d;
}