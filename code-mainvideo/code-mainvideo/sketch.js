//  "SerialPort" object
var serial;

// fill in the name of your serial port here:
//COM3 IN LAB ;COM10 FOT TESTING
var portName = "COM3";//remember to change

var inMessage = [0, 0];

let v1;
let v2;//....process
//delay
var snapshots =[]; //image array, empty at start
var counter = -25;
var total =60; //number of pictures

let v3;
let v4;
let v44;
let v5;

let eyeImg;
let faceImg;
let backImg;
let processdelayImg;
let tapeImg;
let handendImg;

let t;

function preload() {
  eyeImg = loadImage('img/eyeImg.png');
	faceImg = loadImage('img/faceImg.png');
	backImg = loadImage('img/beforeback.png');
	processdelayImg =loadImage('img/processadject2.png');
	tapeImg = loadImage('img/tapew.png');
	handendImg = loadImage('img/handend.png');
}

function setup() {
createCanvas(displayWidth, displayHeight);
//background(255);
  serial = new p5.SerialPort();

  serial.list();
  serial.open(portName);
  serial.on('list', gotList);
  serial.on('data', gotData);
	
//videos
  v1 = createVideo(['nvds/face(1).mp4'],vid1Load);
  v1.hide();
	v1.loop();
  v2 = createVideo('nvds/processrespond.mp4',ready);//......process
  v2.hide();
	v2.loop();
  v3 = createVideo(['nvds/handlong1.mp4'],vid3Load);
  v3.hide();
	v3.loop();
	v4 = createVideo(['nvds/beforeright1.mp4'],vid4Load);
  v4.hide();
	v4.loop();
	v44 = createVideo(['nvds/beforeleft1.mp4'],vid44Load);
  v44.hide();
	v44.loop();
	v5 = createVideo(['nvds/badmotorlong.mp4'],vid5Load);
  v5.hide();
	v5.loop();
	
	
t=1;
}

let go = false;
function ready (){
  go = true;
	v2.loop();
}

// Got the list of ports
function gotList(thelist) {
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    console.log(i + " " + thelist[i]);
  }
}

// Called when there is data available from the serial port
function gotData() {
  var currentString = serial.readLine();  // read the incoming data
  trim(currentString);                    // trim off trailing whitespace
  if (!currentString) return;             // if the incoming string is empty, do no more
  console.log(currentString);
      inMessage = split(currentString, '&');   // save the currentString to use for the text
}

function draw() {
  //background(255,255,255);
	
  if (inMessage[0] == 0){//......butto:0...not press
	    background(0);
   v1.pause();
	 v2.pause();
	   v3.pause();
	  v5.pause();
	  t++;
	  if(t<500){
	t+=random(1,4);
	}
	  if (t>500){
	t-=random(1,4);
		t=0;
	}
	for(let h=50;h<height;h+=96){
	for(let w=50;w<width-50;w+=100){
	eyeball(w,h,0.4);
	}
	}
	  
	  push();
	  scale(.64);
	  image(backImg,0,0);
	  pop();
	  
	   push();//......beforeright
	translate(200,0);
	  translate(displayWidth/2-40,displayHeight/2-30);
	scale(0.8);
	  image(v4,0,0);
	  v4.loop();
	  pop(); 
	  
	   push();//...........face
	translate(200,0);
	  scale(1.1);
	  	 image(v44, 0, 100);
			v44.loop();
	  pop();
	  
	  
 }
 else if (inMessage[0] == 1 || serial.available() > 0 ){//......button:1...press
  background(255);
	v4.pause();
	 v44.pause();
	 
	  push();//...........face
	translate(200,0);
	  scale(1.1);
	  	 image(v1, 0, 100);
			v1.loop();
	  pop();
	  
	 	  push();
	translate(582,180);
	 scale(.68);
	 image(v5,0,0);//.......dropping balls
	v5.loop();
	 pop();
	 
	 //......process delay parts
	 if (go) {
  snapshots[counter] = v2.get();
  counter ++;
  if (counter == total){
  counter = 0;
  	}
 }
	 //......process-1
	 push();
	 translate(866,126);
	  scale(.5);
	 image(processdelayImg,0,0,processdelayImg.width-45,processdelayImg.height);
	 pop();
	 push();
	 fill(255);
	 noStroke();
	 rect(866,386,400,20);
	 pop();
	  push();//......process-2
	translate(200,0);
	  scale(.35);
	 for (var i= 0; i < snapshots.length; i++){
  var index = (i + frameCount) % snapshots.length;
		  v2.loop();
 image(snapshots[index], 1900,360,v2.width-60,v2.height);
}
	//  image(v2,1900,360,v2.width-60,v2.height);
	  pop();
	  
	  push();
	  noStroke();
	  fill(255);
	  rect(850, 400, 450, 10);
	  pop();
	  
	   push();//......handendimg
	translate(200,0);
	  translate(displayWidth/2-40,displayHeight/2-30);
	scale(0.645);
	  image(handendImg,0,0);
	  pop();
	 
	  push();//......hand
	translate(200,0);
	  translate(displayWidth/2-40,displayHeight/2-30);
	scale(0.8);
	image(v3,0,0);
	  v3.loop();
	  pop();
	 
	  push();
	  scale(.35);
	  image(eyeImg, 340, 250);
	  pop();
	  
		  push();
	  scale(.28);
	  image(faceImg, 710, 790);
	  pop();
	
	push();
	  translate(1250,352);
	 scale(.33);
	 image(tapeImg,0,0);
	 pop();
	
	}
	
   
//  ellipse(width/2, height/2, map(inMessage[0], 0, 1, 100, 200), map(inMessage[0], 0, 1, 100, 200));//for testing
  
}

function mousePressed(){//FOR TESTING
  serial.write("1");
    let fs = fullscreen();//press for fullscreen
    fullscreen(!fs); 
}
function mouseReleased(){
  serial.write("0");
}
//1，4，44，5
function vid1Load() {
	v1.loop();
	vid1Load.volume(0);	
}
function vid4Load() {
	v4.loop();
	v4.volume(0);	
}
function vid44Load() {
	v44.loop();
	v44.volume(0);	
}
function vid5Load() {
	v5.loop();
	v5.volume(0);	
}
function vid3Load() {
	v3.loop();
	v3.volume(0);	
}
/*
https://openprocessing.org/sketch/1219989
*/

function eyeball(x,y,s){
	push();
		translate(x,y);
	  scale(s);
	  fill(255);
	  ellipse(0,0,190);
	  fill(0);
	  let rotateang = atan2(map(t,0,500,200,700)-y, map(t,0,500,200,1300)-x);
		rotate(rotateang);
		ellipse(50,0,100);
	 fill(255);
	ellipse(30,20,20);
	pop();
	
}