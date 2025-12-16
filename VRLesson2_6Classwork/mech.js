class Mech {
  constructor(x, y, z, opts = {}) {
    this.baseX = x;
    this.baseY = y;
    this.baseZ = z;
    this.t = Math.random() * Math.PI * 2;
    this.amp = opts.amp ?? (0.5 + Math.random() * 1.5);
    this.speed = opts.speed ?? (0.01 + Math.random() * 0.02);

    this.obj = mechTemplate.cloneNode(true);
    this.obj.classList.add("mech-instance");

    let parts = this.obj.querySelectorAll("a-box,a-sphere,a-cylinder,a-cone,a-plane");
    parts.forEach(p => {
      if (p.getAttribute("src")) return;
      let color = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
      p.setAttribute("material", `color: ${color};`);
    });

    let s = opts.scale ?? (0.6 + Math.random() * 0.5);
    this.obj.setAttribute("scale", { x: s, y: s, z: s });

    this.obj.setAttribute("position", { x: this.baseX, y: this.baseY, z: this.baseZ });
    scene.append(this.obj);

    Mech.army.push(this);
    this._animate();
  }

  _animate() {
    this.t += this.speed;
    let y = this.baseY + Math.sin(this.t) * this.amp;
    let rot = (Math.sin(this.t * 0.5) * 15);
    this.obj.setAttribute("position", { x: this.baseX, y: y, z: this.baseZ });
    this.obj.setAttribute("rotation", { x: 0, y: rot, z: 0 });
    requestAnimationFrame(() => this._animate());
  }

  static createArmy(count, area = { x: 50, z: 50 }) {
    Mech.army = Mech.army || [];
    for (let i = 0; i < count; i++) {
      let x = (Math.random() - 0.5) * area.x;
      let z = (Math.random() - 0.5) * area.z;
      let y = 8 + Math.random() * 4;
      new Mech(x, y, z);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  scene = document.querySelector("a-scene");
  mechTemplate = document.getElementById("mech-1");
  if (!mechTemplate) {
    console.warn("mech template (id=mech-1) not found in DOM");
    return;
  }
  mechTemplate.setAttribute("visible", false);
  Mech.createArmy(12, { x: 60, z: 60 });
  console.log("Mech army deployed! Count:", Mech.army.length);
});