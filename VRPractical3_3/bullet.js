class Bullet {
  constructor() {
    // Creamos una esfera como bala
    this.obj = document.createElement("a-sphere");
    this.obj.setAttribute("radius", 0.5);
    this.obj.setAttribute("color", "yellow"); // para que se vea mejor

    // La bala inicia en la posición actual de la cámara
    let pos = camera.object3D.position;
    this.obj.setAttribute("position", { x: pos.x, y: pos.y, z: pos.z });

    // La agregamos a la escena
    scene.append(this.obj);

    // Dirección del disparo (basada en la rotación de la cámara)
    let theta = camera.object3D.rotation.y + Math.PI;
    let phi = camera.object3D.rotation.x;

    // Velocidad base
    let v = 0.4;
    let v_xz = v * Math.cos(phi);

    // Componentes de la velocidad (dx, dy, dz)
    this.dz = v_xz * Math.cos(theta);
    this.dx = v_xz * Math.sin(theta);
    this.dy = v * Math.sin(phi);
  }

  // Mueve la bala en cada frame
  fire() {
    this.obj.object3D.position.x += this.dx;
    this.obj.object3D.position.y += this.dy;
    this.obj.object3D.position.z += this.dz;
  }
}
