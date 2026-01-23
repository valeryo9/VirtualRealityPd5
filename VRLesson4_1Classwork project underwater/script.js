let rnd = (l,u) => Math.random() * (u-l) + l
let val = 0.75, strength = 0;
let scene;
let camera;
let light_source;
let piranhas = [];
let seahouse;
let turtles = [];
let Krakens = [];
let corals = [];
let whales1 = [];



window.addEventListener("DOMContentLoaded",function() {
  scene = document.querySelector("a-scene");
  camera = document.querySelector("a-camera");
  kraken = document.getElementById("kraken");
  turtle = document.getElementById("turtle");
  whale1 = document.getElementById("whale1");

  kraken.onclick = function(){
    this.components.sound.playSound();
  }

  window.onclick = function(){
    turtle.components.sound.playSound();
  }

  light_source = document.getElementById("light_source");


  
  // Esperar a que A-Frame haya cargado completamente
  scene.addEventListener('loaded', () => {
    // Crear pirañas
    for(let i = 0; i < 20; i++){
      let x = rnd(20,-20);
      let z = rnd(-20,20);
      let piranha = new Piranha(x,-20,z);
      piranhas.push(piranha)
    }

    // Crear tortugas
    for(let i = 0; i < 10; i++){
      let x = rnd(-30,40);
      let z = rnd(-40,30);
      let turtle = new Turtle(x,30,z);
      turtles.push(turtle)
    }

    // Crear krakens
    for(let i = 0; i < 5; i++){
      let x = rnd(-50,50);
      let z = rnd(-50,50);
      let kraken = new Kraken(x,-28,z);
      Krakens.push(kraken)
    }

    // Crear corales
    for(let i = 0; i < 20; i++){
      let x = rnd(-100,100);
      let z = rnd(-100,100);
      let coral = new Coral(x,-30,z);
      corals.push(coral)
    }

    // Crear ballenas
    for(let i = 0; i < 6; i++){
      let x = rnd(-200,200);
      let z = rnd(-200,200);
      let whale = new Whale1(x,10,z);
      whales1.push(whale)
    }

    
    // Iniciar el bucle de animación
    
    loop();
  });
})


function loop(){
  for(let piranha of piranhas){
    piranha.act();
  }
  
  for(let turtle of turtles){
    turtle.act();
  }

  for(let whale of whales1){
    whale.act();
  }


  light_source.object3D.rotation.z += 0.002;
  window.requestAnimationFrame(loop);
}


