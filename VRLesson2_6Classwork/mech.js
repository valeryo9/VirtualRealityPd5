class Mech {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;

    this.obj = mech.cloneNode(true);

    let components = this.obj.getChildren();
    for (let i = 0; i < components.length; i++) {
      components[i].setAttribute("material", "color", "#" + Math.floor(Math.random() * 16777215).toString(16));
    }

    this.obj.setAttribute("position", { x: this.x, y: this.y, z: this.z });
    scene.append(this.obj);

    this.animate();
  }

  animate() {
    let direction = 0.1; // Change in position for animation
    setInterval(() => {
      this.y += direction;
      this.obj.setAttribute("position", { x: this.x, y: this.y, z: this.z });
      if (this.y > 5 || this.y < 0) direction *= -1; // Bounce effect
    }, 100); // Update every 100ms
  }

  static createArmy(count) {
    for (let i = 0; i < count; i++) {
      new Mech(Math.random() * 10, Math.random() * 5, Math.random() * 10);
    }
  }
}

// Create an army of 10 mechs
Mech.createArmy(10);