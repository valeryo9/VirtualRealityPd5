let rnd = (l,u) => Math.random() * (u-l) + l
let scene, camera, potholes = [];

window.addEventListener("DOMContentLoaded",function() {
  scene = document.querySelector("a-scene");
  camera = document.querySelector("a-camera");
  /* Challenge 1
     Add 10 new PotHole at random locations to the potholes array
  */
  for(let i = 0; i < 20; i++) {
    let pothole = document.createElement("a-entity");
    pothole.setAttribute("geometry", "primitive: cylinder; height: 0.1; radius: 1");
    pothole.setAttribute("material", "color: yellow");
    pothole.setAttribute("position", `${rnd(-5, 5)} 0 ${rnd(-5, 5)}`);
    scene.appendChild(pothole);
    potholes.push({obj: pothole});
  }
  setTimeout(loop,100);
})
function loop(){
  /* Challenge 2
     Go through the potholes array.  If the distance between you and a 
     pothole is less than 1.7, set the camera's drop variable to true. 
  */
  for(let p of potholes){
    let d = distance(camera,p.obj);
    if(d < 1.7){
      camera.drop = true;
    }
  }

  if(camera.drop){
    camera.object3D.position.y -= 0.025;
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