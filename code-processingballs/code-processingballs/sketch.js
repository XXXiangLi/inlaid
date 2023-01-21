/*reference:
https://editor.p5js.org/llee02864/sketches/XU86nvKW9
shader.frag & shader.vert files from:
https://openprocessing.org/sketch/1627562
*/
let renderer;
let backShader;

let m = 5;
//ball's size field
let minsize = 50;
let maxsize = 100;

let ct = 0.0;
let drops = [];

const ColorPalette = Object.freeze({
	"backgroundcolor": "#ffffff",
  "yellow": "#f5f5f5",//background-Gradient
  "green": "#355c7d",
  "u_col2": "#ffea63"
});

function preload(){
  backShader = loadShader('shader.vert', 'shader.frag');
}

function setup() {
  renderer = createCanvas(windowWidth, windowHeight, WEBGL);
	
	pixelDensity(1);
//strokeWeight(2);
  for(let i=0; i<m; i++){
    let drop = new Drop(createVector(random(width), height+ random(height)), random(minsize, maxsize), 15.0);
    //15:dropping speed
    drops.push(drop);
  }
  noStroke();
}

function draw() {

  for(let i=0; i<drops.length; i++){
    let drop = drops[i];
    drop.update();
  }

  if(frameCount < 5){
    backShader.setUniform("u_resolution", [width, height]);//shader field...change the color
    backShader.setUniform("u_metanum", m + 1);
  }

  let positions = [];
  let radiuses = [];
  for(let i=0; i<m; i++){
    let drop = drops[i];
    let pos = drop.pos;
    positions.push(pos.x, pos.y);
    let rad = drop.size;
    radiuses.push(rad);
  }
  //top:0.5/2
  positions.push(width * 0.5, height * 2.1);
  radiuses.push(height * 1.9);//top circle's size


  backShader.setUniform("u_positions", positions);
  backShader.setUniform("u_radiuses", radiuses);
  backShader.setUniform("u_time", ct);//current time
  backShader.setUniform("u_backcol1", color(ColorPalette.backgroundcolor)._array);
  backShader.setUniform("u_backcol2", color(ColorPalette.yellow)._array);
  backShader.setUniform("u_col1", color(ColorPalette.backgroundcolor)._array);
  backShader.setUniform("u_col2", color(ColorPalette.u_col2)._array);

  shader(backShader);
  quad(-1, -1, 1, -1, 1, 1, -1, 1);

  ct += deltaTime * 0.001;//faster  little
}


class Drop{
  constructor(pos, size, speed){
    this.pos = pos;
    this.size = size;
    this.speed = speed;
    this.minsize = minsize;
    this.maxsize = maxsize;
  }

  update(){
    //dropping speed
    this.pos.add(createVector(0, -this.speed * map(this.size, this.minsize, this.maxsize, 0.5, 1.0), 0));
    if(this.pos.y < -this.maxsize * 2){
      this.pos.y = height * 1.5 + random(height);
      this.pos.x = random(100,width-100);
      this.size = random(this.minsize, this.maxsize);
    }
  }
}