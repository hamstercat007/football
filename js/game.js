// is it going to be a 2d or 3d canvas(a space where you can draw images in browser)-->
// <!-- place the var img inside ctx, using ctx.drawImage, 10 pixels from left, then right)-->

$(function() {
  var start = Date.now();
  var gameTime = setInterval(function() {
    const elapsedTime = Math.floor((new Date - start)/1000)
    let timerText = "You stayed in the game for "+ elapsedTime + " seconds."
    
    if (elapsedTime < 7)
    {
      timerText += "Don't give up your day job!"
    }
    if (elapsedTime >8 && elapsedTime < 12)
    {
      timerText += "Keep going, the goal is in sight!"
    }
    if (elapsedTime >13 && elapsedTime < 18)
    {
      timerText += "You're a hot shot!"
    }
    else {
      $("#timer").text("You are a champion!") 
    }
    $("#timer").text(timerText)
  }, 1000)
  

  const pitchImage = new Image(); // Create new img element.   Image is a class.
  pitchImage.src = "./images/football_pitch.jpg";
  const footballImage = new Image(); // Create new img element.   Image is a class.
  footballImage.src = "./images/football.png";
  const football = {
    x: 150,
    y: 150, // y's origin is at the top, and = 0.
    // speed: 10,  can use speed and angleIndegrees instead of dx and dy
    // angleInDegrees: 80,
    dx: 3.5, //delta = change. Delta x = How much the x position is changing over time.
    dy: 3.5, //delta y = how much the y position is changing in pixels when rendered.
    width: 100, //width of football
    height: 100 //height of football
  };
  const cursor = {
    width: 40,  //px not needed as we aren't drawing anything, this is used to calculate pointer collision on football.
    height: 40
  }

  window.onload = function() {
    const canvas = document.getElementById("myCanvas");
    canvas.addEventListener("click", event => {
      console.log(event);
      const mx = event.x; // position of mouse. The event in this case is the click. x = e.x
      const my = event.y;
      if (mx < football.x) return; //return means stop running this function
      console.log(1);
      if (my < football.y) return;  //if y position is above football (we click too high), don't do anything.
      console.log(2);
      if (mx > football.x + football.width) return;
      console.log(3);
      if (my > football.y + football.height) return;
      console.log("Football clicked!")
      football.dx *= -1.1  //swap the polarity, if -5, becomes 5, we use the minus to switch direction on x axis(left to right) )
    });
    const ctx = canvas.getContext("2d"); //it's a 2D surface so will have an x and y, if 3D will have an x, y and z. This is getting the context of the canvas
    setInterval(() => {
      tick();
      render(ctx);
    }, 40); //This is 25 frames per second, given 40 milliseconds to draw one frame, if you draw too many things - it will take longer.
  };

  function tickold() {
    // football.speed+=0.1
    // football.angleInDegrees+=0.25
    if (football.x > 930 || football.y < 100 || football.x < 100) {
      football.angleInDegrees = 360 - football.angleInDegrees;
    }
    const angleInRadians = football.angleInDegrees * (Math.PI / 180); //A full circle is 2 PI.  Half a circle is 1 PI, and also 180 degrees
    const vx = Math.sin(angleInRadians); //Math.sin takes in RADIANS and not degrees, therefore need to convert first
    const vy = Math.cos(angleInRadians);
    football.x += vx * football.speed;
    football.y -= vy * football.speed;
  }
  // function fadeball(){
  //   footballImage.hide();
  //   football.hide();  
  // }
  function tick() {
    // football.dx +=0.1     This is acceleration
    // football.dy +=-0.1
    if (football.y < 90) football.dy = Math.abs(football.dy); //to keep it with the same speed dy but positive direction.
    // if (football.x > 850) football.dx = -Math.abs(football.dx); // same speed but -ve direction
    if (football.y > 520) football.dy = -Math.abs(football.dy); // same speed, -ve direction, y = -5 to make it move up the y axis.
    if (football.x < 100 || football.x > 850) {
      console.log("You lose!")
      // fadeball();
      clearInterval(gameTime);
      $("#timer").css("display", "block");
      return  //to exit tick ffunction
    }
      // if (football.x < 100) football.dx = Math.abs(football.dx); // same speed, +ve direction
    football.x += football.dx; // every time the tick function is run, change x by dx. football.x is changing on each tick.
    //If dx is one, x will increase by 1. It is running 25 times a second. E.g. if x is 10, dx is 15, x becomes 25 px.
    football.y += football.dy;
    //velocity is constant if dx and dy do not change
  }

  function render(ctx) {
    ctx.drawImage(pitchImage, 110, 60); //I am using the context to draw on the canvas
    ctx.drawImage(footballImage, football.x, football.y);
  }
  var fox = document.getElementById('fox');
  document.addEventListener('mousemove', function(event){
    fox.style.left = event.clientX + 'px';
    fox.style.top = event.clientY + 'px';     
    
  })
});

// Canvas as a blank piece of paper and the context is a pen designed to draw on that canvas//
// 1s = 1000 ms, this is how long we wait until we draw the next frame
//  250 ms, => divide by 1000 = 0.25s => 1/0.25 = 4, => 4 frames per second
// We want 25 frames per second, this is what games want as smooth animation.
// offset means how far you are away from the origin, meaning 0, 0 in current frame of reference.  This is the distance
// from the origin.

