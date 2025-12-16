class UFO{
  constructor(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;
    this.a = rnd(0,360);
    this.dx = Math.cos(this.a) / 20;
    this.dz = Math.sin(this.a) / 20;
    this.obj = document.createElement("a-sphere");

    this.obj.setAttribute("position",{x:this.x,y:this.y,z:this.z});
    scene.append(this.obj);
 
  }

  roam(){
    this.x += this.dx;
    if(this.x < -25 || this.x > 25){
      this.dx = -this.dx;
    }
    this.z += this.dz;
    if(this.z < -25 || this.z > 25){
      this.dz = -this.dz;
    }
    this.obj.setAttribute("position",{x:this.x,y:this.y,z:this.z});
    
  }
}