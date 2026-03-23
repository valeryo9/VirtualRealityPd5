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

    

      let dolphinSound = document.querySelector("#dolphinSound");
          if(dolphinSound){
            dolphinSound.currentTime = 0;
            dolphinSound.play();
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
    

    this.x += this.vx;
    this.z += this.vz;
    this.time += 0.1;
    

    this.y = this.y + Math.sin(this.time * 0.1) * 0.05;
    

    if(this.x > 50 || this.x < -50){
      this.vx *= -1;
    }
    if(this.z > 50 || this.z < -50){
      this.vz *= -1;
    }
    

    if(this.y > 10){
      this.y = 10;
    }
    if(this.y < -10){
      this.y = -10;
    }
    

    this.obj.setAttribute("position", `${this.x} ${this.y} ${this.z}`);
  }
}