class Coral {
  constructor(x,y,z){
    this.float = false;
    this.x = x;
    this.y = y;
    this.z = z;
    this.vx = rnd(-0.05, 0.05);
    this.vz = rnd(-0.05, 0.05);
    this.time = 0;
    this.obj = document.createElement("a-entity");
    this.obj.setAttribute('gltf-model', '#coral');
    this.obj.setAttribute('scale', '2 2 2');

    this.obj.setAttribute("position",`${this.x} ${this.y} ${this.z}`);
    this.obj.addEventListener("click",()=>{
      this.float = true;
    })
    scene.append(this.obj);
  
    
    // Actualizar la posición en la entidad
    this.obj.setAttribute("position", `${this.x} ${this.y} ${this.z}`);
  }
}
