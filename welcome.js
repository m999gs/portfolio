var gc = new GameCanvas();

var t = 0;
loop();
function loop() {
  background("black");

  var functions = [
    function(x) {
      return Math.sin(x * 6 + t * 0.01) * (100) * Math.sin(t * 0.03);
    },
    function(x) {
      return (Math.sin(x * 6 + t * 0.01) * (120) + 20) * Math.sin(t * 0.03);
    }
  ];
  
  var colors = ["rgb(255, 240, 230)", "rgb(248, 47, 77)"];
  for (var j = 0; j < 2; j++) {
    var color = colors[j];
    var func = functions[j];
    beginPath();
    for (var i = 0; i <= 1 + 0.01; i += 0.01) {
      lineTo(i * width, height - 200 + func(i));
    }
    lineTo(width, height);
    lineTo(0, height);
    closePath();
    fillStyle(color);
    fill();
  }
  
  t++;
  update();
  requestAnimationFrame(loop);
}
