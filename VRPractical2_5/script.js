let scene;

// Example classes (not used in Lesson 2.9)
class Wall {
  constructor(x, y, z) {
    this.el = document.createElement("a-box");
    this.el.setAttribute("position", `${x} ${y} ${z}`);
    this.el.setAttribute("width", "1");
    this.el.setAttribute("height", "2");
    this.el.setAttribute("depth", "0.5");
    this.el.setAttribute("material", "src: url(https://thumbs.dreamstime.com/b/artificial-grass-texture-green-grass-d-artificial-grass-texture-green-grass-d-rendering-trugreen-processed-lawn-mower-144955352.jpg); repeat: 1 1");
  }
}

class Coin {
  constructor(x, y, z) {
    this.el = document.createElement("a-sphere");
    this.el.setAttribute("position", `${x} ${y} ${z}`);
    this.el.setAttribute("radius", "0.3");
    this.el.setAttribute("color", "gold");
    this.el.setAttribute("animation", "property: rotation; to: 0 360 0; loop: true; dur: 2000");
  }
}

class Gem {
  constructor(x, y, z) {
    this.el = document.createElement("a-octahedron");
    this.el.setAttribute("position", `${x} ${y} ${z}`);
    this.el.setAttribute("color", "purple");
    this.el.setAttribute("scale", "0.5 0.5 0.5");
    this.el.setAttribute("animation", "property: rotation; to: 360 360 360; loop: true; dur: 3000");
  }
}

// Maze layout
let maze = [
  "---E -------------------",
  "-    C      G      C   -",
  "- ----  -------  ----  -",
  "-         C            -",
  "-    ----     ----     -",
  "-   C     G      C     -",
  "- ----  -------  ----  -",
  "-        C        G    -",
  "-    ---      --      --",
  "-   G      C      G    -",
  "--------------------- E-",
  "-",
];

window.addEventListener("DOMContentLoaded", function () {
  scene = document.querySelector("a-scene");

  for (let r = 0; r < maze.length; r++) {
    for (let c = 0; c < maze[r].length; c++) {
      let char = maze[r][c];
      let x = c;
      let y = 1;
      let z = -r;

      if (char === "-") {
        let wall = new Wall(x, y, z);
        scene.appendChild(wall.el);
      } else if (char === "C") {
        let coin = new Coin(x, y, z);
        scene.appendChild(coin.el);
      } else if (char === "G") {
        let gem = new Gem(x, y, z);
        scene.appendChild(gem.el);
      } else if (char === "E") {
        let exit = document.createElement("a-box");
        exit.setAttribute("position", `${x} 1.9 ${z}`);
        exit.setAttribute("color", "yellow");
        exit.setAttribute("width", "3");
        exit.setAttribute("height", "0.2");
        exit.setAttribute("depth", "0.3");
        scene.appendChild(exit);
      }
    }
  }
});
