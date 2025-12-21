class Bullet {
  constructor() {

    this.obj = document.createElement("a-sphere");
    this.obj.setAttribute("radius", 0.5);
    this.obj.setAttribute("color", "yellow"); // para que se vea mejor

     let pos = camera.object3D.position;
    this.obj.setAttribute("position", { x: pos.x, y: pos.y, z: pos.z });

     scene.append(this.obj);

     let theta = camera.object3D.rotation.y + Math.PI;
    let phi = camera.object3D.rotation.x;

     let v = 0.4;
    let v_xz = v * Math.cos(phi);

     this.dz = v_xz * Math.cos(theta);
    this.dx = v_xz * Math.sin(theta);
    this.dy = v * Math.sin(phi);
  }

   fire() {
    this.obj.object3D.position.x += this.dx;
    this.obj.object3D.position.y += this.dy;
    this.obj.object3D.position.z += this.dz;
  }
}
