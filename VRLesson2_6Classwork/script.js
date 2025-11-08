let scene;
let mechTemplate;

window.addEventListener("DOMContentLoaded", function () {
  scene = document.querySelector("a-scene");
  mechTemplate = document.getElementById("mech-1");
  spawnArmy(12);
  loop();
});

function loop() {
  window.requestAnimationFrame(loop);
}

class Mech {
  constructor(template) {
    this.template = template;
  }

  spawn(x, z) {
    const newMech = this.template.cloneNode(true);
    newMech.removeAttribute("id");
    newMech.setAttribute("position", `${x} 6 ${z}`);
    newMech.setAttribute("rotation", `0 ${Math.random() * 360} 0`);
    newMech.setAttribute("scale", "1 1 1");
    newMech.setAttribute("animation__move", "property: position; dir: alternate; dur: 5000; to: 0 6 -12; loop: true; easing: easeInOutSine");
    newMech.setAttribute("animation__rotate", "property: rotation; dir: alternate; dur: 4000; to: 0 40 0; loop: true; easing: easeInOutSine");
    newMech.setAttribute("animation__bobbing", "property: position; dir: alternate; dur: 2000; to: 0 6.5 0; loop: true; easing: easeInOutSine");
    scene.appendChild(newMech);
  }
}

function spawnArmy(size) {
  const factory = new Mech(mechTemplate);
  for (let i = 0; i < size; i++) {
    const x = Math.random() * 60 - 30;
    const z = Math.random() * -60 - 10;
    factory.spawn(x, z);
  }
  console.log(`${size} mechs deployed on the battlefield!`);
}
