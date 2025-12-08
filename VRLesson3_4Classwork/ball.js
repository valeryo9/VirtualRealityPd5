class Ball{
  constructor(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;
    this.dx = rnd(1,3) / 250;
    this.dy = rnd(1,3) / 250;
    this.dz = rnd(1,3) / 250;

    this.obj = document.createElement("a-sphere");
    this.obj.setAttribute("clickable","");
    // Challenge 6: Add the event listener to make the ball disappear and increase the score
  

    this.obj.setAttribute("position",{x:this.x, y:this.y, z:this.z});
    scene.append(this.obj);
  }
  move(){
    this.x += this.dx;
    this.y += this.dy;
    this.z += this.dz;
    if(this.x < -10 || this.x > 10){
      this.dx = -this.dx;
    }
    if(this.y < 0 || this.x > 10){
      this.dy = -this.dy;
    }
    if(this.z < -10 || this.z > 10){
      this.dz = -this.dz;
    }
    this.obj.setAttribute("position",{x:this.x, y:this.y, z:this.z});
  }
}