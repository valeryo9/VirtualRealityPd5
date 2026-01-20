class Kraken {
  constructor(x,y,z){
    this.float = false;
    this.x = x;
    this.y = y;
    this.z = z;
    this.vx = rnd(-0.05, 0.05);
    this.vz = rnd(-0.05, 0.05);
    this.time = 0;
    this.obj = document.createElement("a-entity");
    this.obj.setAttribute('gltf-model', '#kraken');
    this.obj.setAttribute('scale', '0.5 0.5 0.5');

    this.obj.setAttribute("position",`${this.x} ${this.y} ${this.z}`);
    this.obj.addEventListener("click",()=>{
      this.float = true;
      // Reproducir sonido de la ballena
      let whaleSound = document.querySelector("#whaleSound");
      if(whaleSound){
        whaleSound.currentTime = 0;
        whaleSound.play();
      }
    })
    scene.append(this.obj);
  
    
    // Actualizar la posición en la entidad
    this.obj.setAttribute("position", `${this.x} ${this.y} ${this.z}`);
  }
}
