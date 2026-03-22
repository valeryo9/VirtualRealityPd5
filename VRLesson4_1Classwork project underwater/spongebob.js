class Spongebob{
  constructor(x,y,z){
    this.float = false;
    this.x = x;
    this.y = y;
    this.z = z;
    this.vx = rnd(-0.05, 0.05);
    this.vz = rnd(-0.05, 0.05);
    this.time = 0;
    this.obj = document.createElement("a-entity");
    this.obj.setAttribute('gltf-model', '#spongebob');

    this.obj.setAttribute("position",`${this.x} ${this.y} ${this.z}`);
    this.obj.addEventListener("click",()=>{

    let spongebobSound = document.querySelector("#spongebobSound");
      if(spongebobSound){
        spongebobSound.currentTime = 0;
        spongebobSound.play();
      }
    })
    scene.append(this.obj);

    this.obj.setAttribute("position", `${this.x} ${this.y} ${this.z}`);

  }
}
