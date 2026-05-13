let bg;

let vehicles = [];

let selected = 1;

let pulse = 0;

function preload() {

  bg = loadImage('assets/background.png');

  vehicles[0] = loadImage('assets/petrol.png');
  vehicles[1] = loadImage('assets/ev.png');
  vehicles[2] = loadImage('assets/hybrid.png');
}


function setup() {

  createCanvas(windowWidth, windowHeight);

  imageMode(CENTER);
  rectMode(CENTER);
}


function draw() {

  background(0);

  drawBackground();

  drawOverlay();

  drawTitle();

  drawCars();

  drawHUD();

  drawBottomBar();

  pulse += 0.03;
}


function drawBackground() {

  image(bg, width/2, height/2, width, height);
}


function drawOverlay() {

  fill(0, 160);
  rect(width/2, height/2, width, height);
}



function drawTitle() {

  textAlign(CENTER);

  fill(255);

  textSize(72);
  text('ECOVISION', width/2, 130);

  fill(120);

  textSize(24);
  text('Future Mobility Experience', width/2, 180);

  fill(200);

  textSize(20);

  text(
    'Explore. Compare. Understand.',
    width/2,
    240
  );


  drawButton();
}


function drawButton() {

  stroke(0, 255, 255);

  fill(0, 120);

  rect(width/2, 330, 320, 70, 12);

  fill(0, 255, 255);

  noStroke();

  textSize(24);

  text('START EXPERIENCE', width/2, 338);
}


function drawCars() {

  let targetPositions = [
    width/2 - 520,
    width/2,
    width/2 + 520
  ];


  // Selected car moves slightly center-focused

  if(selected === 0) {

    targetPositions = [
      width/2 - 280,
      width/2 + 180,
      width/2 + 620
    ];
  }

  if(selected === 1) {

    targetPositions = [
      width/2 - 520,
      width/2,
      width/2 + 520
    ];
  }

  if(selected === 2) {

    targetPositions = [
      width/2 - 620,
      width/2 - 180,
      width/2 + 280
    ];
  }


  for(let i = 0; i < 3; i++) {

    let active = selected === i;

    let scaleValue = active ? 1.18 : 0.82;

    let img = vehicles[i];

let baseWidth = 620 * scaleValue;

let aspectRatio = img.height / img.width;

let calculatedHeight = baseWidth * aspectRatio;

image(
  img,
  targetPositions[i],
  height/2 + 130,
  baseWidth,
  calculatedHeight
);


    drawGlowRing(
      targetPositions[i],
      height/2 + 270,
      active
    );


    if(active) {

      drawVehicleCard(i, targetPositions[i]);
    }
  }
}


function drawGlowRing(x, y, active) {

  noFill();

  strokeWeight(active ? 4 : 2);

  if(active) {

    stroke(0, 255, 255, 180);

  } else {

    stroke(255, 255, 255, 30);
  }


  ellipse(
    x,
    y,
    300 + sin(pulse) * 15,
    90 + sin(pulse) * 5
  );
}


function drawVehicleCard(i, x) {

  let names = [
    'PETROL',
    'ELECTRIC',
    'HYBRID'
  ];


  let efficiency = [
    'Efficiency 30%',
    'Efficiency 90%',
    'Efficiency 65%'
  ];


  fill(0, 160);

  stroke(0, 255, 255);

  rect(x, height - 220, 290, 140, 12);

  noStroke();

  fill(255);

  textSize(28);

  text(
    names[i],
    x,
    height - 250
  );

  fill(180);

  textSize(18);

  text(
    efficiency[i],
    x,
    height - 190
  );
}


function drawHUD() {

  fill(0, 140);

  stroke(0, 255, 255);

  rect(180, 180, 260, 140, 12);

  noStroke();

  fill(255);

  textAlign(LEFT);

  textSize(26);

  text(
    '24°C',
    90,
    150
  );

  fill(0, 255, 120);

  textSize(20);

  text(
    'CLEAN AIR INDEX',
    90,
    200
  );

  text(
    '72 / 100',
    90,
    240
  );


  drawTopRightHUD();
}


function drawTopRightHUD() {

  fill(0, 140);

  stroke(0, 255, 255);

  rect(width - 220, 160, 360, 120, 12);

  noStroke();

  fill(255);

  textAlign(LEFT);

  textSize(24);

  text(
    'THE FUTURE IS ELECTRIC',
    width - 370,
    150
  );

  fill(120);

  textSize(18);

  text(
    'Sustainable. Smart. Limitless.',
    width - 370,
    200
  );
}


function drawBottomBar() {

  fill(0, 140);

  stroke(0, 255, 255, 80);

  rect(width/2, height - 60, width - 80, 80, 12);

  noStroke();

  let items = [
    'LOWER EMISSIONS',
    'ENERGY EFFICIENCY',
    'COST EFFECTIVE',
    'FUTURE READY'
  ];


  fill(0, 255, 255);

  textAlign(CENTER);

  textSize(18);


  for(let i = 0; i < items.length; i++) {

    text(
      items[i],
      220 + i * 320,
      height - 50
    );
  }
}


function mouseMoved() {

  let positions = [
    width/2 - 420,
    width/2,
    width/2 + 420
  ];


  for(let i = 0; i < 3; i++) {

    if(

      mouseX > positions[i] - 220 &&
      mouseX < positions[i] + 220 &&

      mouseY > height/2 - 50 &&
      mouseY < height/2 + 280

    ) {

      selected = i;
    }
  }
}


function windowResized() {

  resizeCanvas(windowWidth, windowHeight);
}