/*
click the mouse TO START

 apikey：5Bt4AR5MXEwwY26SHHo2ujJnEIg1KE1w
9n0a5Ey4l6XXVruOeE86epF3yxnnuZK3

*/

//reference: Daniel Shiffman-https://www.youtube.com/watch?v=mj8_w11MvH8&index=10&list=PLRqwX-V7Uu6a-SQiI4RtIwuOrLJGnel0r
//https://openprocessing.org/sketch/602668

//var api = "https://api.giphy.com/v1/gifs/search?"; 

//for pic zoomer
class zoom {
	//update(){}
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
		this.scale =  0.1;
		this.scaleInc = 0.1;//add variable
    this.fade = 10;
  }

  update() {
		this.scale += this.scaleInc;
		if (this.scale < 0.5) this.fade = map(this.scale, 0, 0.5, 0, 255);
	  //if (this.scale > maxScale - 1)
		if (this.scale > .5) this.fade = map(this.scale, maxScale - 1, maxScale, 255, 0);
	}
	
	draw() {
		push();
		imageMode(CENTER);
		scale(this.scale);
		image(this.img, 0, 0);
		pop();
	}
}

//"sucess","adversiting","slogan"
const tag = ["success"];//change:sucess/advertising/slogan/...

const bigEnough = 5.0;						
const maxScale = 15.0;	//12			
const randomTag = true;		
let currentTag = 0;			
const frameSkip = 0;
const api = "https://api.giphy.com/v1/stickers/search?&api_key="; 

const apiKey = ["5Bt4AR5MXEwwY26SHHo2ujJnEIg1KE1w","9n0a5Ey4l6XXVruOeE86epF3yxnnuZK3"];
let sequentialDL = false;				
let query;
let currentKey = 3;			
let timer = 0;					
let images = [];				
let loadedImages = [];
let imgNum = 0;					
let imgLimit = 50;
let GIFurls = [];				
let GIFs = [];
let GIFnum = 0;					
let GIFsLoaded = 0;
let offset;							
let GIF;
let erasing = false;		
let erasedLoadMsg = false;
let msgFade, msgDiv;
let loadAnother = false, 
    loadDelay = 0;

function setup() {
	createCanvas(1000, 600, WEBGL);//must webgl
	offset = int(random(100));
	query = tag[currentTag];
  getJSON();
}


function draw(){
   // filter(THRESHOLD);
	let tempGIF;	
		if (loadAnother && GIFsLoaded < GIFurls.length) {
			if (loadDelay < 199) {
				loadDelay++;
			} else {
				loadImage(GIFurls[GIFsLoaded], gotGIF);		
				loadAnother = false;
			}
		}
/*
important part:
reference:https://openprocessing.org/sketch/1161318
*/
	if (GIFsLoaded > (sequentialDL ? 0 : 49)) {			
		if (!erasedLoadMsg) {
			tempGIF = new zoom(width / 2, height / 2, loadedImages[GIFnum]);
			GIFs.push(tempGIF);
			erasedLoadMsg = true;
 		sequentialDL = true;
 		getJSON();						
		}
		
		if (GIFs.length > 0) {
			if (GIFs[GIFs.length-1].scale > bigEnough &&
					GIFs[GIFs.length-1].scale < bigEnough + 0.2) {		
				GIFnum = ++GIFnum % loadedImages.length;
				tempGIF = new zoom(width / 2, height / 2, loadedImages[GIFnum]);
				GIFs.push(tempGIF);											
			}
		} else {					
			GIFnum = ++GIFnum % loadedImages.length;
			tempGIF = new zoom(width / 2, height / 2, loadedImages[GIFnum]);
			GIFs.push(tempGIF);											
		}
		if (frameSkip < 2 || frameCount % frameSkip == 0) {
			if (GIFs.length > 0) {
			
				for (let i = 0; i < GIFs.length; i++) {
					if (GIFs[i].fade <= 0) {			
						GIFs.shift();							
					} else {
						GIFs[i].update();
						GIFs[i].draw();
					}
				}
			}
		}
	}
}

function getJSON() {		
	//offset = random(100);
	offset = int(random(100));
  let url = api + apiKey[currentKey] + "&offset=" + offset + "&q=" + query; 
	GIFsLoaded = 0;//start
  loadJSON(url, gotData, loadError);		
}

function gotData(giphy) { 	
	GIFurls = [];
	for (let i = 0; i < giphy.data.length; i++) {				
		
		GIFurls.push(giphy.data[i].images.downsized.url);
		if (!sequentialDL)														
			loadImage(GIFurls[GIFurls.length-1], gotGIF, loadError);	
  }
	GIFsLoaded = 0;				
	if (sequentialDL) loadImage(GIFurls[GIFsLoaded], gotGIF, loadError);	
}

function gotGIF(giphyImg) { 	
	if (GIFsLoaded == 0 && loadedImages.length >= 50) loadedImages = [];
	if (GIFsLoaded < 50 && loadedImages.length >= 50) {
		loadedImages[GIFsLoaded] = giphyImg;
	} else {
		loadedImages.push(giphyImg);
	}
	GIFsLoaded++;
	if (sequentialDL) {									
		if (GIFsLoaded < GIFurls.length) {
			loadAnother = true;
		}
	}
}

function loadError(errMsg) {
	++currentKey;
	if (currentKey >= apiKey.length) currentKey = 0;
	getJSON();
}


function mouseClicked() {

 		query = tag[currentTag];
 		sequentialDL = true;
 		getJSON();
}