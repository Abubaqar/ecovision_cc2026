let bg;

let vehicles = [];

let selected = 1;

let pulse = 0;

let logo;

let evSound;
let petrolSound;
let hybridSound;

let animatedPositions = [];
let animatedScales = [];

function preload() {

  bg = loadImage('assets/background.png');
  logo = loadImage('assets/logo.png');

  vehicles[0] = loadImage('assets/petrol.png');
  vehicles[1] = loadImage('assets/ev.png');
  vehicles[2] = loadImage('assets/hybrid.png');
}


function setup() {

  createCanvas(windowWidth, windowHeight);

  animatedPositions = [
  width/2 - 500,
  width/2,
  width/2 + 500
];

animatedScales = [0.72, 1.02, 0.72];

  imageMode(CENTER);
  rectMode(CENTER);
}


function draw() {

  background(0);

  drawBackground();

  drawOverlay();

  drawTitle();

  drawCars();

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

  image(
    logo,
    width/2,
    110,
    500,
    500
  );


  textAlign(CENTER);

  fill(255);

  textSize(24);

  text(
    'Future Mobility Experience',
    width/2,
    190
  );


  fill(170);

  textSize(18);

  text(
    'Explore. Compare. Understand.',
    width/2,
    230
  );


  drawButton();
}


function drawButton() {

  stroke(0, 255, 255);

  fill(0, 120);

  rect(width/2, 280,320,70,12);

  fill(0, 255, 255);

  noStroke();

  textAlign(CENTER);

  textSize(24);

  text(
    'START EXPERIENCE',
    width/2,
    287
  );
}


function drawCars() {

  let targetPositions = [
    width/2 - 500,
    width/2,
    width/2 + 500
  ];


  if(selected === 0) {

    targetPositions = [
      width/2 - 260,
      width/2 + 220,
      width/2 + 650
    ];
  }

  if(selected === 1) {

    targetPositions = [
      width/2 - 500,
      width/2,
      width/2 + 500
    ];
  }

  if(selected === 2) {

    targetPositions = [
      width/2 - 650,
      width/2 - 220,
      width/2 + 260
    ];
  }


  for(let i = 0; i < 3; i++) {

    let active = selected === i;

    let targetScale = active ? 1.02 : 0.72;


    animatedPositions[i] = lerp(
      animatedPositions[i],
      targetPositions[i],
      0.08
    );


    animatedScales[i] = lerp(
      animatedScales[i],
      targetScale,
      0.08
    );


    let img = vehicles[i];

    let baseWidth = 520 * animatedScales[i];

    let aspectRatio = img.height / img.width;

    let calculatedHeight = baseWidth * aspectRatio;


    image(
      img,
      animatedPositions[i],
      height/2 + 120,
      baseWidth,
      calculatedHeight
    );
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




function drawTopRightHUD() {

  fill(0, 120);

  stroke(0, 255, 255);

  rect(width - 240, 170, 400, 150, 12);

  noStroke();

  fill(255);

  textAlign(LEFT);

  textSize(28);

  text(
    'MOBILITY OVERVIEW',
    width - 410,
    135
  );


  let labels = [
    'Energy Efficiency',
    'Environmental Impact',
    'Charging Ecosystem'
  ];


  fill(160);

  textSize(18);


  for(let i = 0; i < labels.length; i++) {

    text(
      labels[i],
      width - 410,
      190 + i * 38
    );
  }
}


function drawBottomBar() {

  fill(0, 220);

  stroke(0, 255, 255, 120);

  rect(width/2, height - 60, width - 100, 85, 12);

  noStroke();

  let items = [
    'PETROL',
    'ELECTRIC',
    'HYBRID'
  ];


  let desc = [
    'Fast Refueling',
    'High Efficiency',
    'Balanced Mobility'
  ];


  let positions = [
    width/2 - 350,
    width/2,
    width/2 + 350
  ];


  for(let i = 0; i < 3; i++) {

    let active = selected === i;

    fill(active ? '#00FFFF' : 160);

    textAlign(CENTER);

    textSize(active ? 24 : 20);

    text(
      items[i],
      positions[i],
      height - 70
    );


    fill(active ? 255 : 110);

    textSize(15);

    text(
      desc[i],
      positions[i],
      height - 38
    );
  }
}

function mousePressed() {

  if(selected === 0) {
    petrolSound.play();
  }

  if(selected === 1) {
    evSound.play();
  }

  if(selected === 2) {
    hybridSound.play();
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