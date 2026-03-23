class Dolphin{
  constructor(x,y,z){
    this.float = false;
    this.x = x;
    this.y = y;
    this.z = z;
    this.vx = rnd(-0.1, 0.1);
    this.vz = rnd(-0.1, 0.1);
    this.time = 0;
    this.obj = document.createElement("a-entity");
    this.obj.setAttribute('gltf-model', '#dolphin');
    this.obj.setAttribute('scale', '0.05 0.05 0.05');
    this.obj.setAttribute('animation-mixer', '');
    this.obj.setAttribute('rotation', '0 200 0');
    this.obj.setAttribute('position', '0 50 0');
    this.obj.setAttribute('shadow', 'cast: true; receive: true');

    this.obj.setAttribute("position",`${this.x} ${this.y} ${this.z}`);
    this.obj.addEventListener("click",()=>{
    this.float = true;

    

      let spongebobSound = document.querySelector("#spongebobSound");
          if(spongebobSound){
            spongebobSound.currentTime = 0;
            spongebobSound.play();
          }
    })
    scene.append(this.obj);


  }
};
