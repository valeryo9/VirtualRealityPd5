let rnd = (l,u) => Math.floor(Math.random()*(u-l) + l);
let time_text, balls = [], t = 60;

/* Challenge 3
   Create a variable to store score and set it to 0. 
   Create a variable to store the reference to the <a-text> for 
   displaying the score created in Challenge 1
*/ 


window.addEventListener("DOMContentLoaded",function() {
  scene = document.querySelector("a-scene");
  time_text = document.getElementById("time");
  // Challenge 4: Assign the variable to the <a-text> for displaying the score

  for(let i = 0;i < 10; i++){
    let x = rnd(-10,10);
    let y = rnd(-10,10);
    let z = rnd(-10,10);

    balls.push(new Ball(x,y,z));
  }
  countdown();
  loop();
})

function countdown(){
  time_text.setAttribute("value",`Time: ${t}`);
  t--;
  setTimeout(countdown,1000);
}

function loop(){
  // Challenge 5:  Display the score in the HUD
  
  for(let ball of balls){
    ball.move();
  }
  window.requestAnimationFrame(loop);
}

// Challenge 6 is in the Ball class