// script.js

let rnd = (l, u) => Math.random() * (u - l) + l;

let scene, camera, player;
let bullets = [];
let enemies = [];
let ammo_boxes = [];

let ammo_count = 6;
let enemy_killed = 0;
let time_left = 45;
let game_over = false;

// HUD elements
let ammoDisplay, timeDisplay, killsDisplay, enemiesDisplay;
let endScreen, endMessage;

window.addEventListener("DOMContentLoaded", function () {
  scene = document.querySelector("a-scene");
  camera = document.querySelector("#camera");
  player = document.querySelector("#player");

  ammoDisplay = document.querySelector("#ammoDisplay");
  timeDisplay = document.querySelector("#timeDisplay");
  killsDisplay = document.querySelector("#killsDisplay");
  enemiesDisplay = document.querySelector("#enemiesDisplay");
  endScreen = document.querySelector("#endScreen");
  endMessage = document.querySelector("#endMessage");

  spawnWorldObjects();
  spawnEnemies(8);
  spawnAmmoBoxes(6);

  updateHUD();

  window.addEventListener("keydown", function (e) {
    if (e.key === " " && ammo_count > 0 && !game_over) {
      bullets.push(new Bullet());
      ammo_count--;
      updateHUD();
    }
  });

  setTimeout(loop, 50);
  setTimeout(countdown, 1000);
});

// ------------------------------------------------------------
// GAME LOOP
// ------------------------------------------------------------
function loop() {
  if (game_over) return;

  // Move bullets
  bullets = bullets.filter(b => b.fire());

  // Bullet → Enemy collision
  bullets.forEach((b, bi) => {
    enemies.forEach((enemy, ei) => {
      if (enemy && distance(b.obj, enemy) < 1.2) {
        scene.removeChild(enemy);
        enemies.splice(ei, 1);

        scene.removeChild(b.obj);
        bullets.splice(bi, 1);

        enemy_killed++;
        updateHUD();
      }
    });
  });

  // Enemy AI: slow chase player
  enemies.forEach(enemy => {
    let epos = enemy.object3D.position;
    let ppos = player.object3D.position;

    let dx = ppos.x - epos.x;
    let dz = ppos.z - epos.z;
    let dist = Math.sqrt(dx * dx + dz * dz);

    if (dist > 1) {
      epos.x += (dx / dist) * 0.02;
      epos.z += (dz / dist) * 0.02;
    }
  });

  // Player collects ammo
  ammo_boxes.forEach((box, i) => {
    if (distance(camera, box) < 1.5) {
      scene.removeChild(box);
      ammo_boxes.splice(i, 1);
      ammo_count += 4;
      updateHUD();
    }
  });

  // Rotate ammo boxes
  ammo_boxes.forEach(box => {
    box.object3D.rotation.y += 0.05;
  });

  // Win condition
  if (enemies.length === 0 && !game_over) {
    endGame(true);
  }

  window.requestAnimationFrame(loop);
}

// ------------------------------------------------------------
// COUNTDOWN TIMER
// ------------------------------------------------------------
function countdown() {
  if (game_over) return;

  time_left--;
  updateHUD();

  if (time_left <= 0) {
    endGame(false);
    return;
  }

  setTimeout(countdown, 1000);
}

// ------------------------------------------------------------
// END GAME
// ------------------------------------------------------------
function endGame(win) {
  game_over = true;

  endMessage.textContent = win ? "YOU WIN!" : "YOU LOSE!";
  endScreen.style.display = "flex";
}

// ------------------------------------------------------------
// SPAWN OBJECTS
// ------------------------------------------------------------
function spawnEnemies(n) {
  for (let i = 0; i < n; i++) {
    let enemy = document.createElement("a-sphere");
    enemy.setAttribute("radius", 0.8);
    enemy.setAttribute("color", "red");
    enemy.setAttribute("position", {
      x: rnd(-20, 20),
      y: 1,
      z: rnd(-20, -5)
    });
    scene.append(enemy);
    enemies.push(enemy);
  }
}

function spawnAmmoBoxes(n) {
  for (let i = 0; i < n; i++) {
    let box = document.createElement("a-box");
    box.setAttribute("depth", 0.7);
    box.setAttribute("height", 0.7);
    box.setAttribute("width", 0.7);
    box.setAttribute("color", "blue");
    box.setAttribute("position", {
      x: rnd(-20, 20),
      y: 1,
      z: rnd(-20, -5)
    });
    scene.append(box);
    ammo_boxes.push(box);
  }
}

function spawnWorldObjects() {
  // Trees
  for (let i = 0; i < 12; i++) {
    let tree = document.createElement("a-cylinder");
    tree.setAttribute("radius", 0.5);
    tree.setAttribute("height", 4);
    tree.setAttribute("color", "#8B4513");
    tree.setAttribute("position", {
      x: rnd(-25, 25),
      y: 2,
      z: rnd(-25, -5)
    });

    let leaves = document.createElement("a-sphere");
    leaves.setAttribute("radius", 2);
    leaves.setAttribute("color", "green");
    leaves.setAttribute("position", { x: 0, y: 2.5, z: 0 });

    tree.append(leaves);
    scene.append(tree);
  }

  // Rocks
  for (let i = 0; i < 10; i++) {
    let rock = document.createElement("a-sphere");
    rock.setAttribute("radius", rnd(0.3, 1));
    rock.setAttribute("color", "#555");
    rock.setAttribute("position", {
      x: rnd(-25, 25),
      y: 0.5,
      z: rnd(-25, -5)
    });
    scene.append(rock);
  }
}

// ------------------------------------------------------------
// UTILITY
// ------------------------------------------------------------
function distance(obj1, obj2) {
  let p1 = obj1.object3D.position;
  let p2 = obj2.object3D.position;

  return Math.sqrt(
    Math.pow(p1.x - p2.x, 2) +
    Math.pow(p1.y - p2.y, 2) +
    Math.pow(p1.z - p2.z, 2)
  );
}

function updateHUD() {
  ammoDisplay.textContent = ammo_count;
  timeDisplay.textContent = time_left;
  killsDisplay.textContent = enemy_killed;
  enemiesDisplay.textContent = enemies.length;
}