class Pothole{
  constructor(x,z){
    this.obj = document.createElement("a-cylinder");
    this.obj.setAttribute("height",0.1);
    this.obj.setAttribute("color","black");
    this.obj.setAttribute("position",{x:x,y:0.025,z:z});
    scene.append( this.obj );
  }
}