class Dude{
  constructor(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;
    //Challenge 1: Add delta variables in order to make the dude walk forward on the z axis and jump up and down on the y axis.
    // make the motion slower and smoother
    this.deltaZ = 0.02; // forward speed
    this.deltaY = 0.01; // jump speed

    this.obj = dudeTemplate.cloneNode(true);
    // Add a class so the element can be selected for debugging/inspector
    this.obj.classList.add("dude");
    this.obj.setAttribute("position",{x:this.x,y:this.y,z:this.z});
    scene.append(this.obj);
  }
  jump(){
    //Challenge 2: Add the accumulators to modify the y and z variables
    this.z += this.deltaZ;
    this.y += this.deltaY;

    //Challenge 3: Add the decision in order to alternate the delta on the y axis when the dude reaches less then 1 or greater than 2
    if(this.y > 2 || this.y < 1){
      this.deltaY = -this.deltaY;
    }

    this.obj.setAttribute("position",{x:this.x,y:this.y,z:this.z});
  }
}