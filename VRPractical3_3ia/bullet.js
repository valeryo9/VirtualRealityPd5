// bullet.js

class Bullet {
  constructor() {
    this.obj = document.createElement("a-sphere");
    this.obj.setAttribute("radius", 0.15);
    this.obj.setAttribute("color", "yellow");

    // Starting position = camera position
    let pos = camera.object3D.position;
    this.obj.setAttribute("position", { x: pos.x, y: pos.y, z: pos.z });

    scene.append(this.obj);

    // Bullet speed
    this.speed = 0.6;

    // Direction based on camera rotation
    let rot = camera.object3D.rotation;
    let theta = rot.y + Math.PI; // horizontal angle
    let phi = rot.x;             // vertical angle

    let v = this.speed;
    let v_xz = v * Math.cos(phi);

    this.dx = v_xz * Math.sin(theta);
    this.dy = v * Math.sin(phi);
    this.dz = v_xz * Math.cos(theta);

    // Track distance traveled
    this.distance = 0;
    this.maxDistance = 80;
  }

  fire() {
    let p = this.obj.object3D.position;

    p.x += this.dx;
    p.y += this.dy;
    p.z += this.dz;

    this.distance += this.speed;

    // Remove bullet if too far
    if (this.distance > this.maxDistance) {
      scene.removeChild(this.obj);
      return false; // signal to remove from array
    }

    return true; // keep bullet alive
  }
}