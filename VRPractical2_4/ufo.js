class UFO {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.dy = Math.random() * 0.5 + 0.1; // Random speed between 0.1 and 0.6
    this.obj = document.createElement("a-entity");
    this.obj.setAttribute("geometry", "primitive: box; width: 1; height: 0.5; depth: 1");
    this.obj.setAttribute("material", "color: green; opacity: 0.75");
    this.obj.setAttribute("position", { x: x, y: y, z: z });
    scene.append(this.obj);
  }

  invade() {
    this.y -= this.dy;
    this.obj.setAttribute("position", { x: this.x, y: this.y, z: this.z });
    if (this.y < 0) {
      this.y = 0; // Stay on the ground
    }
  }
}

// Create an array of UFOs at random high locations
const ufos = [];
for (let i = 0; i < 10; i++) {
  const x = Math.random() * 10 - 5; // Random x position
  const y = Math.random() * 20 + 10; // Random y position (10 to 30)
  const z = Math.random() * 10 - 5; // Random z position
  ufos.push(new UFO(x, y, z));
}

// Function to update UFOs
function updateUFOs() {
  ufos.forEach(ufo => ufo.invade());
}

// Call updateUFOs in your animation loop