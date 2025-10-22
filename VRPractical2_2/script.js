window.addEventListener("DOMContentLoaded", function() {

  // Get all objects
  let car = document.querySelector("#car");
  let pokeball = document.querySelector("#pokemonball");
  let rocket = document.querySelector("#rocket");
  let dude = document.querySelector("#dude");
  let sun = document.querySelector("#sun");

  // Initial values
  let carX = 0;
  let carDir = -0.02;

  let pokeballRotX = 0;

  let rocketY = 1;
  let rocketUp = true;

  let dudeScale = 1;
  let grow = true;

  let sunOpacity = 0;
  let fadeDone = false;

  // Loop function
  function loop() {

    // Car moves to the left and right
    carX += carDir;
    if (carX < -5 || carX > 0) {
      carDir = -carDir;
    }
    car.setAttribute("position", carX + " 0 -8");

    // Pokeball rotates on X axis
    pokeballRotX += 2;
    pokeball.object3D.rotation.x = pokeballRotX * (Math.PI / 180); // convert to radians manually

    // Rocket flies up and down
    if (rocketUp) {
      rocketY += 0.05;
      if (rocketY >= 10) rocketUp = false;
    } else {
      rocketY -= 0.05;
      if (rocketY <= 1) rocketUp = true;
    }
    rocket.setAttribute("position", "3 " + rocketY + " -4");

    // Dude grows and shrinks
    if (grow) {
      dudeScale += 0.01;
      if (dudeScale >= 2) grow = false;
    } else {
      dudeScale -= 0.01;
      if (dudeScale <= 1) grow = true;
    }
    dude.object3D.scale.set(dudeScale, dudeScale, dudeScale);

    // Sun fades in
    if (!fadeDone) {
      sunOpacity += 0.01;
      if (sunOpacity >= 1) {
        sunOpacity = 1;
        fadeDone = true;
      }
      sun.setAttribute("material", "opacity", sunOpacity);
    }

    // Keep looping
    window.requestAnimationFrame(loop);
  }

  // Start the animation loop
  loop();

});
