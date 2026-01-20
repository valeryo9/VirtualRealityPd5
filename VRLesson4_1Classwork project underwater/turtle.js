class Turtle{
  constructor(x,y,z){
    this.float = false;
    this.x = x;
    this.y = y;
    this.z = z;
    this.vx = rnd(-0.05, 0.05);
    this.vz = rnd(-0.05, 0.05);
    this.time = 0;
    this.obj = document.createElement("a-entity");
    this.obj.setAttribute('gltf-model', '#turtle');
    this.obj.setAttribute('scale', '0.1 0.1 0.1');
    this.obj.setAttribute('animation-mixer', '');
    this.obj.setAttribute('shadow', 'cast: true; receive: true');

    this.obj.setAttribute("position",`${this.x} ${this.y} ${this.z}`);
    this.obj.addEventListener("click",()=>{
    this.float = true;

    

      let underwaterSound = document.querySelector("#underwaterSound");
          if(underwaterSound){
            underwaterSound.currentTime = 0;
            underwaterSound.play();
          }
    })
    scene.append(this.obj);
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
    this.time += 0.1;
    
    // Wave-like vertical motion
    this.y = this.y + Math.sin(this.time * 0.05) * 0.02;
    
    // Bounce off boundaries
    if(this.x > 20 || this.x < -20){
      this.vx *= -1;
    }
    if(this.z > 20 || this.z < -20){
      this.vz *= -1;
    }
    
    // Keep in reasonable Y bounds
    if(this.y > 5){
      this.y = 5;
    }
    if(this.y < -5){
      this.y = -5;
    }
    
    // Actualizar la posición en la entidad
    this.obj.setAttribute("position", `${this.x} ${this.y} ${this.z}`);
  }
}