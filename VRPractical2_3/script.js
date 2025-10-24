let rnd = (l,u) => Math.floor(Math.random()*(u-l) + l);
let scene;

window.addEventListener("DOMContentLoaded",function() {
  scene = document.querySelector("a-scene"); //CSS Selector

  for(let i = 0; i < 70; i++){
    let x = rnd(-20,20);
    let z = rnd(-20,20);
    let tree = new Tree(x, 0 , z);
  }

  for(let i = 0; i < 50; i++){
    let x = rnd(-20,20);
    let z = rnd(-20,20);
    let tree = new House(x, 0 , z);
  }

  for(let i = 0; i < 100; i++){
    let x = rnd(-20,20);
    let z = rnd(-20,20);
    let tree = new Cloud(x, 0 , z);
  }

})
