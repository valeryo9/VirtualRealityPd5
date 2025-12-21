
let time_left = 45;

 let rnd = (l, u) => Math.random() * (u - l) + l;

 let scene, camera;

 let bullets = [];

 let enemies = [];
let ammo_boxes = [];

 let ammo_count = 10;
let enemy_killed = 0;

 let hud;

 let game_over = false;
let endScreen, endMessage;

window.addEventListener("DOMContentLoaded", function () {
   scene = document.querySelector("a-scene");
  camera = document.querySelector("a-camera");
   endScreen = document.querySelector("#endScreen");
  endMessage = document.querySelector("#endMessage");

   hud = document.querySelector("#hud");
  if (!hud) {
    hud = document.createElement("a-text");
    hud.setAttribute("id", "hud");
    hud.setAttribute("position", { x: 0, y: 0, z: 3 });
    hud.setAttribute("scale", { x: 2, y: 2, z: 2 });
    hud.setAttribute("text", { value: "", color: "black", width: 10 });
    camera.append(hud);
  }

   
  for (let i = 0; i < 15; i++) {
    enemies.push(new Enemy(rnd(-12, 12), 1, rnd(-10, -30)));
  }

   
  for (let i = 0; i < 10; i++) {
    ammo_boxes.push(new AmmoBox(rnd(-12, 12), 0.5, rnd(-6, -26)));
  }

   
  for (let i = 0; i < 14; i++) {
    let x = rnd(-18, 18);
    let z = rnd(-10, -35);

     let tree = document.createElement("a-cylinder");
    tree.setAttribute("color", "#8B4513");
    tree.setAttribute("radius", 0.5);
    tree.setAttribute("height", 4);
    tree.setAttribute("position", { x, y: 1, z });
    scene.append(tree);

     let leaves = document.createElement("a-circle");
    leaves.setAttribute("color", "#2E8B57");
    leaves.setAttribute("radius", 2.5);
    leaves.setAttribute("position", { x, y: 5, z });
    scene.append(leaves);
  }

   
  window.addEventListener("keydown", function (e) {
    if (game_over) return;

    if (e.key == " " && ammo_count > 0) {
      bullets.push(new Bullet());  
      ammo_count--;  
      updateHUD();
    }
  });

   
  updateHUD();
  setTimeout(loop, 100);  
  setTimeout(countdown, 1000);  
});

 
function loop() {
  if (game_over) return;

   for (let b = bullets.length - 1; b >= 0; b--) {
    bullets[b].fire();

     let p = bullets[b].obj.object3D.position;
    if (Math.abs(p.x) > 200 || Math.abs(p.y) > 200 || Math.abs(p.z) > 200) {
      safeRemove(bullets[b].obj);
      bullets.splice(b, 1);
    }
  }
 
  for (let e = enemies.length - 1; e >= 0; e--) {
    for (let b = bullets.length - 1; b >= 0; b--) {
      if (distance(bullets[b].obj, enemies[e].obj) < 1.2) {
        enemies[e].remove();
        enemies.splice(e, 1);

        enemy_killed++;

        safeRemove(bullets[b].obj);
        bullets.splice(b, 1);

        updateHUD();
        break;
      }
    }
  }

   
  for (let i = ammo_boxes.length - 1; i >= 0; i--) {
    if (distance(camera, ammo_boxes[i].obj) < 1.7) {
      ammo_boxes[i].remove();
      ammo_boxes.splice(i, 1);
      ammo_count += 4;
      updateHUD();
    }
  }

   if (enemies.length === 0) {
    endGame(true);
    return;
  }

  window.requestAnimationFrame(loop);
}

 
function countdown() {
  if (game_over) return;

  time_left--;
  updateHUD();

   if (time_left <= 0 && enemies.length > 0) {
    endGame(false);
    return;
  }

  setTimeout(countdown, 1000);
}

 
function endGame(win) {
  game_over = true;

  endMessage.textContent = win ? "YOU WIN!" : "YOU LOSE!";
  endScreen.style.display = "flex";
}


 
function updateHUD() {
  if (!hud) return;

  hud.setAttribute("text", {
    value: `AMMO: ${ammo_count}\nKILLS: ${enemy_killed}\nTIME: ${time_left}`,
    color: "black",
    width: 10,
  });
}

 
function safeRemove(el) {
  try {
    if (el && el.parentNode) el.parentNode.removeChild(el);
  } catch (err) {}
}

 
 function distance(obj1, obj2) {
  let x1 = obj1.object3D.position.x;
  let y1 = obj1.object3D.position.y;
  let z1 = obj1.object3D.position.z;

  let x2 = obj2.object3D.position.x;
  let y2 = obj2.object3D.position.y;
  let z2 = obj2.object3D.position.z;

  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + Math.pow(z1 - z2, 2));
}

 
class Enemy {
  constructor(x, y, z) {
    this.obj = document.createElement("a-box");
    this.obj.setAttribute("color", "red");
    this.obj.setAttribute("depth", 1);
    this.obj.setAttribute("height", 2);
    this.obj.setAttribute("width", 1);
    this.obj.setAttribute("position", { x, y, z });

     this.obj.setAttribute("animation", {
      property: "rotation",
      to: "0 360 0",
      loop: true,
      dur: 2500,
    });

    scene.append(this.obj);
  }

  remove() {
    safeRemove(this.obj);
  }
}

 
class AmmoBox {
  constructor(x, y, z) {
    this.obj = document.createElement("a-sphere");
    this.obj.setAttribute("color", "yellow");
    this.obj.setAttribute("radius", 0.4);
    this.obj.setAttribute("position", { x, y, z });

     this.obj.setAttribute("animation", {
      property: "position",
      dir: "alternate",
      dur: 800,
      loop: true,
      to: `${x} ${y + 0.25} ${z}`,
    });

    scene.append(this.obj);
  }

  remove() {
    safeRemove(this.obj);
  }
}
