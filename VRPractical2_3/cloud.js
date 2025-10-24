class Cloud {
  constructor(x, y, z) {
    this.obj = document.createElement("a-entity");
    

    const puffPositions = [
      {x: 0, y: 6.5, z: 0},
      {x: 1, y: 6, z: 0},
      {x: -1, y: 6, z: 0}
    ];
    
    puffPositions.forEach(pos => {
      let puff = document.createElement("a-sphere");
      puff.setAttribute("color", "white");
      puff.setAttribute("radius", "0.75");
      puff.setAttribute("position", `${pos.x} ${pos.y} ${pos.z}`);
      this.obj.append(puff);
    });
    
    this.obj.setAttribute("position", {x:x, y:y, z:z});
    scene.append(this.obj);
  }
}
