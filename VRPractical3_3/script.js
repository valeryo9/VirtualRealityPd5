/*************************************************************
 * VR Practical 3.3 - Survival (A-Frame)
 * Objetivo: eliminar todos los enemigos antes de que el tiempo
 * se acabe. La munición es limitada y se repone recolectando
 * cajas de ammo.
 *
 * Challenges cubiertos:
 * 1) Enemies en el mundo
 * 2) Ammo boxes en el mundo
 * 3) Detectar impactos: enemy desaparece + kills++
 * 4) Solo disparar si hay ammo
 * 5) Recolectar ammo box: desaparece + ammo aumenta
 * 6) You Win / You Lose según tiempo/enemigos restantes
 * 7) Mundo inmersivo: objetos extra
 *************************************************************/

// Tiempo del juego en segundos
let time_left = 45;

// Función helper para números aleatorios (rango [l, u))
let rnd = (l, u) => Math.random() * (u - l) + l;

// Referencias a escena/cámara A-Frame
let scene, camera;

// Balas: usamos un array para permitir múltiples disparos
let bullets = [];

// Arreglos de objetos del mundo
let enemies = [];
let ammo_boxes = [];

// Contadores (HUD)
let ammo_count = 10;
let enemy_killed = 0;

// HUD para mostrar AMMO / KILLS / TIME
let hud;

// Control de finalización
let game_over = false;
let endScreen, endMessage;

window.addEventListener("DOMContentLoaded", function () {
  // 1) Capturamos la escena y la cámara desde el HTML
  scene = document.querySelector("a-scene");
  camera = document.querySelector("a-camera");
   endScreen = document.querySelector("#endScreen");
  endMessage = document.querySelector("#endMessage");

  // 2) Creamos HUD si no existe en el HTML
  hud = document.querySelector("#hud");
  if (!hud) {
    hud = document.createElement("a-text");
    hud.setAttribute("id", "hud");
    hud.setAttribute("position", { x: 0, y: 0, z: 3 });
    hud.setAttribute("scale", { x: 2, y: 2, z: 2 });
    hud.setAttribute("text", { value: "", color: "black", width: 10 });
    camera.append(hud);
  }

  /******************* Challenge 1: Enemies *******************/
  // Creamos varios enemigos (a-box rojos) y los guardamos en enemies[]
  for (let i = 0; i < 15; i++) {
    enemies.push(new Enemy(rnd(-12, 12), 1, rnd(-10, -30)));
  }

  /***************** Challenge 2: Ammo Boxes ******************/
  // Creamos cajas de munición (a-box verdes)
  for (let i = 0; i < 10; i++) {
    ammo_boxes.push(new AmmoBox(rnd(-12, 12), 0.5, rnd(-6, -26)));
  }

  /************ Challenge 7: Objetos del mundo ***************/
  // Agregamos árboles para inmersión (tronco + follaje)
  for (let i = 0; i < 14; i++) {
    let x = rnd(-18, 18);
    let z = rnd(-10, -35);

    // Tronco
    let tree = document.createElement("a-cylinder");
    tree.setAttribute("color", "#8B4513");
    tree.setAttribute("radius", 0.5);
    tree.setAttribute("height", 4);
    tree.setAttribute("position", { x, y: 1, z });
    scene.append(tree);

    // Hojas
    let leaves = document.createElement("a-circle");
    leaves.setAttribute("color", "#2E8B57");
    leaves.setAttribute("radius", 2.5);
    leaves.setAttribute("position", { x, y: 5, z });
    scene.append(leaves);
  }

  /******** Challenge 4: disparar solo con ammo ********/
  // Base: disparo con Spacebar y si ammo_count > 0
  // Aquí además soportamos múltiples balas (bullets.push)
  window.addEventListener("keydown", function (e) {
    if (game_over) return;

    if (e.key == " " && ammo_count > 0) {
      bullets.push(new Bullet()); // crea una bala desde la cámara
      ammo_count--; // consume munición
      updateHUD();
    }
  });

  // Inicializamos HUD y arrancamos loops
  updateHUD();
  setTimeout(loop, 100); // loop de animación
  setTimeout(countdown, 1000); // loop del temporizador
});

/*************************************************************
 * LOOP PRINCIPAL (animación)
 * - Mueve balas
 * - Detecta impactos bala-enemy (Challenge 3)
 * - Detecta recolección de ammo (Challenge 5)
 * - Verifica condición de victoria (Challenge 6)
 *************************************************************/
function loop() {
  if (game_over) return;

  /************ Mover balas ************/
  for (let b = bullets.length - 1; b >= 0; b--) {
    bullets[b].fire();

    // Si la bala se aleja demasiado, la removemos (limpieza)
    let p = bullets[b].obj.object3D.position;
    if (Math.abs(p.x) > 200 || Math.abs(p.y) > 200 || Math.abs(p.z) > 200) {
      safeRemove(bullets[b].obj);
      bullets.splice(b, 1);
    }
  }

  /******** Challenge 3: colisión bala vs enemigo ********/
  // Si una bala golpea un enemigo:
  // - enemigo desaparece
  // - enemy_killed++
  // - la bala se elimina
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

  /******** Challenge 5: recolectar ammo ********/
  // Si la cámara (jugador) se acerca a una caja:
  // - la caja desaparece
  // - ammo_count aumenta
  for (let i = ammo_boxes.length - 1; i >= 0; i--) {
    if (distance(camera, ammo_boxes[i].obj) < 1.7) {
      ammo_boxes[i].remove();
      ammo_boxes.splice(i, 1);
      ammo_count += 4;
      updateHUD();
    }
  }

  /******** Challenge 6: condición de victoria ********/
  if (enemies.length === 0) {
    endGame(true);
    return;
  }

  window.requestAnimationFrame(loop);
}

/*************************************************************
 * COUNTDOWN (temporizador)
 * Reduce time_left cada segundo y valida derrota/fin.
 *************************************************************/
function countdown() {
  if (game_over) return;

  time_left--;
  updateHUD();

  // Challenge 6: derrota si el tiempo llega a 0 y quedan enemigos
  if (time_left <= 0 && enemies.length > 0) {
    endGame(false);
    return;
  }

  setTimeout(countdown, 1000);
}

/*************************************************************
 * Finaliza el juego mostrando mensaje en la escena
 *************************************************************/
function endGame(win) {
  game_over = true;

  endMessage.textContent = win ? "YOU WIN!" : "YOU LOSE!";
  endScreen.style.display = "flex";
}


/*************************************************************
 * Actualiza el HUD para mostrar contadores
 *************************************************************/
function updateHUD() {
  if (!hud) return;

  hud.setAttribute("text", {
    value: `AMMO: ${ammo_count}\nKILLS: ${enemy_killed}\nTIME: ${time_left}`,
    color: "black",
    width: 10,
  });
}

/*************************************************************
 * Remueve elementos del DOM de forma segura
 *************************************************************/
function safeRemove(el) {
  try {
    if (el && el.parentNode) el.parentNode.removeChild(el);
  } catch (err) {}
}

/*************************************************************
 * Distancia 3D entre dos entidades A-Frame (para colisiones)
 *************************************************************/
function distance(obj1, obj2) {
  let x1 = obj1.object3D.position.x;
  let y1 = obj1.object3D.position.y;
  let z1 = obj1.object3D.position.z;

  let x2 = obj2.object3D.position.x;
  let y2 = obj2.object3D.position.y;
  let z2 = obj2.object3D.position.z;

  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + Math.pow(z1 - z2, 2));
}

/*************************************************************
 * Clase Enemy (Challenge 1 + animación como booster)
 *************************************************************/
class Enemy {
  constructor(x, y, z) {
    this.obj = document.createElement("a-box");
    this.obj.setAttribute("color", "red");
    this.obj.setAttribute("depth", 1);
    this.obj.setAttribute("height", 2);
    this.obj.setAttribute("width", 1);
    this.obj.setAttribute("position", { x, y, z });

    // Animación simple para mejorar experiencia (grade booster)
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

/*************************************************************
 * Clase AmmoBox (Challenge 2 + animación como booster)
 *************************************************************/
class AmmoBox {
  constructor(x, y, z) {
    this.obj = document.createElement("a-sphere");
    this.obj.setAttribute("color", "yellow");
    this.obj.setAttribute("radius", 0.4);
    this.obj.setAttribute("position", { x, y, z });

    // Animación "flotando" para mejor visibilidad (booster)
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
