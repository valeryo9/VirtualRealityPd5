class Ball{
  constructor(x,y,z){
    this.x = x;
    this.y = y;
    this.dy = rnd(1,4)/100 * (Math.random() < 0.5 ? 1: -1);
    this.maxY = this.y + rnd(5,15);
    this.z = z;
    this.a = 0;
    this.da = 0.002;

    this.obj = document.createElement("a-sphere");
    let r = Math.floor(rnd(0,255));
    let g = Math.floor(rnd(0,255));
    let b = Math.floor(rnd(0,255));
    this.obj.setAttribute("color",`rgb(${r},${g},${b})`);
    
    this.camera = document.createElement("a-camera");
    this.camera.setAttribute("active",false);
    this.camera.setAttribute("wasd-controls-enabled",false);

    /* Challenge 3
       Create a cursor and add it to the camera.  This will
       enable you to interact with other objects from this camera
    */
    
    /* Challenge 4
       When the user clicks on this sphere, turn off the cameras of 
       all the other balls (Hint: Challenge 1) and set the camera
       of this ball as the active one.
    */

    this.obj.append( this.camera )

    this.obj.setAttribute("position",{x:this.x, y:this.y, z:this.z});
    scene.append(this.obj);
  }
  bounce(){
    this.y += this.dy;
    if(this.y < 0.5 || this.y > this.maxY){
      this.dy = -this.dy;
    }
    this.obj.setAttribute("position",{x:this.x, y:this.y, z:this.z });
  }
}