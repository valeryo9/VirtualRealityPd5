class House {
  constructor(x, y, z) {
    this.obj = document.createElement("a-entity");
    
    // base
    let base = document.createElement("a-box");
    base.setAttribute("color", "red");
    base.setAttribute("depth", "2");
    base.setAttribute("height", "1.5");
    base.setAttribute("width", "2");
    base.setAttribute("position", "0 1 0");
    this.obj.append(base);
    
    //roof
    let roof = document.createElement("a-cone");
    roof.setAttribute("color", "pink");
    roof.setAttribute("height", "1.5");
    roof.setAttribute("radius-bottom", "1.5");
    roof.setAttribute("position", "0 2.5 0");
    this.obj.append(roof);
    
    this.obj.setAttribute("position", {x:x, y:y, z:z});
    scene.append(this.obj);
  }
}