class Rocket {
  constructor(x, y, z) {
    // Create main rocket entity
    this.entity = document.createElement("a-entity");
    this.entity.setAttribute("position", x + " " + y + " " + z);
    
    // Create rocket body (cylinder)
    this.body = document.createElement("a-cylinder");
    this.body.setAttribute("height", "2");
    this.body.setAttribute("radius", "0.2");
    this.body.setAttribute("color", "#ff4444");
    
    // Create rocket nose cone (cone)
    this.nose = document.createElement("a-cone");
    this.nose.setAttribute("height", "0.5");
    this.nose.setAttribute("radius-bottom", "0.2");
    this.nose.setAttribute("position", "0 1.25 0");
    this.nose.setAttribute("color", "#cc2222");
    
    // Add components to rocket entity
    this.entity.appendChild(this.body);
    this.entity.appendChild(this.nose);
    
    // Animation properties
    this.speed = Math.random() * 0.1 + 0.05; // Random speed between 0.05 and 0.15
    this.isLaunched = false;
  }

  launch() {
    this.isLaunched = true;
    // Add animation
    this.entity.setAttribute("animation", {
      property: "position",
      to: this.entity.getAttribute("position").x + " 100 " + this.entity.getAttribute("position").z,
      dur: (2000 / this.speed),
      easing: "easeInQuad"
    });
  }
}

// Create grid of rockets
function createRocketGrid() {
  const scene = document.querySelector("a-scene");
  const rockets = [];
  const gridSize = 10; // 10x10 grid
  const spacing = 2;
  
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const x = (i - gridSize/2) * spacing;
      const y = -1 - Math.random() * 2; // Random Y position below the plane
      const z = (j - gridSize/2) * spacing;
      
      const rocket = new Rocket(x, y, z);
      scene.appendChild(rocket.entity);
      rockets.push(rocket);
    }
  }

  // Launch all rockets with slight delay between each
  rockets.forEach((rocket, index) => {
    setTimeout(() => {
      rocket.launch();
    }, index * 100); // 100ms delay between each launch
  });
}

// Initialize when scene loads
document.addEventListener("DOMContentLoaded", () => {
  createRocketGrid();
});
