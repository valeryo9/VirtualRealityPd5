class Piranha{
  constructor(x,y,z){
    this.float = false;
    this.x = x;
    this.y = y;
    this.z = z;
    this.yCentro = y;  // Guardar la Y central para la oscilación
    this.vx = rnd(-0.05, 0.05);
    this.vz = rnd(-0.05, 0.05);
    this.time = 0;
    this.obj = document.createElement("a-entity");
    this.obj.setAttribute('gltf-model', '#piranha');
    this.obj.setAttribute('scale', '1 1 1');


    this.obj.setAttribute("position",`${this.x} ${this.y} ${this.z}`);
    this.obj.addEventListener("click",()=>{
      this.float = true;
    })
    scene.append(this.obj);
  }
  scale(size){
    this.obj.setAttribute("scale",`${size} ${size} ${size}`);
  }
  angleTo(that){
    let dx = that.object3D.position.x - this.obj.object3D.position.x;
    let dz = that.object3D.position.z - this.obj.object3D.position.z;


    this.angle = Math.atan(dx/dz)
    if(dz < 0){
        this.angle += Math.PI
    }
  }
  rotateTowards(that){
    this.angleTo(that);
    this.obj.object3D.rotation.y = this.angle;
  }
  act(){
    this.rotateTowards(camera);
    
    // Swimming movement
    this.x += this.vx;
    this.z += this.vz;
    this.time += 0.5;
    
    // Wave-like vertical motion around the center position
    this.y = this.yCentro + Math.sin(this.time * 0.05) * 2;
    
    // Bounce off boundaries
    if(this.x > 20 || this.x < -20){
      this.vx *= -1;
    }
    if(this.z > 20 || this.z < -20){
      this.vz *= -1;
    }
    
    this.obj.setAttribute("position", `${this.x} ${this.y} ${this.z}`);
    
  
    
  }
}
