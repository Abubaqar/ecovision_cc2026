let currentPage = 'intro';
let selectedVehicle = 'ev';

const vehicles = {
  ev: {
    name: 'Electric',
    color: '#00ffff',
    cost: '₹2/km',
    range: '450 km',
    maintenance: 'Low',
    impact: 'Minimal'
  },

  petrol: {
    name: 'Petrol',
    color: '#ff9d00',
    cost: '₹8/km',
    range: '700 km',
    maintenance: 'Medium',
    impact: 'High'
  },

  diesel: {
    name: 'Diesel',
    color: '#9cff57',
    cost: '₹6/km',
    range: '900 km',
    maintenance: 'Medium-High',
    impact: 'Very High'
  }
};


function setup() {
  createCanvas(windowWidth, windowHeight);
}


function draw() {
  background(10);

  if(currentPage === 'intro') {
    drawIntro();
  }

  if(currentPage === 'showcase') {
    drawShowcase();
  }
}


function drawIntro() {

  fill(255);
  textAlign(CENTER, CENTER);

  textSize(50);
  text('EcoVision', width/2, height/2 - 100);

  textSize(22);
  fill(180);
  text('Vehicle Compare Tool', width/2, height/2 - 50);

  textSize(18);
  fill(140);
  text(
    'Explore the future of Petrol, Diesel and Electric mobility.',
    width/2,
    height/2
  );


  fill(0,255,255);
  rect(width/2 - 110, height/2 + 60, 220, 60, 12);

  fill(0);
  textSize(22);
  text('Start Experience', width/2, height/2 + 90);
}


function drawShowcase() {

  fill(255);
  textSize(40);
  textAlign(CENTER);
  text('Mobility Systems', width/2, 70);


  drawHUD();


  drawVehicleCard(width/2 - 320, height/2, 'petrol');
  drawVehicleCard(width/2, height/2, 'ev');
  drawVehicleCard(width/2 + 320, height/2, 'diesel');
}


function drawHUD() {

  const vehicle = vehicles[selectedVehicle];

  fill(20);
  stroke(vehicle.color);
  strokeWeight(2);

  rect(50, 140, 320, 420, 18);

  noStroke();

  fill(vehicle.color);
  textSize(30);
  textAlign(LEFT);

  text(vehicle.name, 80, 190);

  fill(180);
  textSize(18);

  text('Running Cost: ' + vehicle.cost, 80, 270);
  text('Range: ' + vehicle.range, 80, 330);
  text('Maintenance: ' + vehicle.maintenance, 80, 390);
  text('Impact: ' + vehicle.impact, 80, 450);
}


function drawVehicleCard(x, y, type) {

  const vehicle = vehicles[type];

  let active = selectedVehicle === type;

  push();

  translate(x, y);

  if(active) {
    scale(1.08);
  }

  fill(active ? 25 : 40);

  stroke(active ? vehicle.color : 80);
  strokeWeight(active ? 3 : 1);

  rect(-110, -180, 220, 360, 20);


  fill(vehicle.color);
  rect(-70, -110, 140, 70, 10);


  fill(255);
  noStroke();

  textAlign(CENTER);

  textSize(28);
  text(vehicle.name, 0, 40);

  fill(160);
  textSize(15);

  text('Hover to inspect vehicle', 0, 100);

  pop();
}


function mousePressed() {

  if(currentPage === 'intro') {

    if(
      mouseX > width/2 - 110 &&
      mouseX < width/2 + 110 &&
      mouseY > height/2 + 60 &&
      mouseY < height/2 + 120
    ) {
      currentPage = 'showcase';
    }
  }
}


function mouseMoved() {

  if(currentPage !== 'showcase') return;


  if(isInside(width/2 - 320, height/2)) {
    selectedVehicle = 'petrol';
  }

  if(isInside(width/2, height/2)) {
    selectedVehicle = 'ev';
  }

  if(isInside(width/2 + 320, height/2)) {
    selectedVehicle = 'diesel';
  }
}


function isInside(cardX, cardY) {

  return (
    mouseX > cardX - 110 &&
    mouseX < cardX + 110 &&
    mouseY > cardY - 180 &&
    mouseY < cardY + 180
  );
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}