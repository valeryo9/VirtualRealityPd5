class Robot{
  constructor(x,y,z){
    this.float = false;
    this.x = x;
    this.y = y;
    this.z = z;
    this.obj = document.createElement("a-entity");
    this.obj.setAttribute('gltf-model', '#robot');
    this.obj.setAttribute('scale', {x:0.1, y:0.1, z:0.1});


    this.obj.setAttribute("position",{x:this.x,y:this.y,z:this.z});
    this.obj.addEventListener("click",()=>{
      this.float = true;
    })
    scene.append(this.obj);
  }
  scale(size){
    this.obj.setAttribute("scale",{x:size,y:size,z:size});
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
    if(this.float){
      this.obj.object3D.position.y += 0.1;
    }
  }
}
