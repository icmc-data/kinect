const mapa1 = 'data/map.json'
const mapa2 = 'data/mapBoss.json'
let Map1
let Map2
let n=1;
let world=1;

let mover=[];
let matriz=[];
let countEnemy;
let sprite;
let bomber;
let BX;
let BY;
let auxX=0;
let auxY=0;
let auxVal=0;
let dir=1;
let photoDiv;

let crops=[];
crops.push({
	x : 56,
	y : 21,
});
crops.push({
	x : 2,
	y : 3,
});
crops.push({
	x : 55,
	y : 3,
});
crops.push({
	x : 16,
	y : 21,
});
crops.push({
	x : 16,
	y : 3,
});

let video = null;
let canvas = null;
let photo = null;
const widthInput = 244;    
const heightInput = 244;

function setup() {
	Map1['getTile'] = function (col, row) {
		return this.tiles[row * this.cols + col]
	}
	mover[1]=-1;
	mover[0]=0;
	iniTablero();
	createCanvas(windowWidth, windowHeight);
	
}

function preload(){
	Map1 = loadJSON(mapa1);
	Map2 = loadJSON(mapa2);
	sprite=loadImage('images/bomberman.png');
	loopMl();
}

function draw() {

	addEntities()
	if (frameCount%60===0){
		moveEnemy();
	}	
}

function moveEnemy(){
	for(let i=1;i<n;i++){
		if (mover[i]!=null && mover[i]["vida"]<=0) {
			matriz[mover[i]["x"]][mover[i]["y"]]=3;
			mover[i]=null;
			countEnemy--;
		}
		if (mover[i]!=null && matriz[mover[i]["x"]+mover[i]["dirX"]][mover[i]["y"]+mover[i]["dirY"]]!=1 && matriz[mover[i]["x"]+mover[i]["dirX"]][mover[i]["y"]+mover[i]["dirY"]]!=2 && matriz[mover[i]["x"]+mover[i]["dirX"]][mover[i]["y"]+mover[i]["dirY"]]!=mover[i]["tipo"]) {
			if (mover[i]["y"]===BY && mover[i]["x"]===BX) {
				clear();
				textSize(50)
				text("Perdiste",width/2,height/2)
			 	noLoop();
			}
			matriz[mover[i]["x"]][mover[i]["y"]]=  3;
			matriz[mover[i]["x"]+mover[i]["dirX"]][mover[i]["y"]+mover[i]["dirY"]]=mover[i]["tipo"]
			mover[i]["x"]+=mover[i]["dirX"]
			mover[i]["y"]+=mover[i]["dirY"]

			if (matriz[mover[i]["x"]+mover[i]["dirX"]][mover[i]["y"]+mover[i]["dirY"]]!=3 && matriz[mover[i]["x"]+mover[i]["dirX"]][mover[i]["y"]+mover[i]["dirY"]]!=5 && matriz[mover[i]["x"]+mover[i]["dirX"]][mover[i]["y"]+mover[i]["dirY"]]!=0){
				canMove(mover[i]["x"],mover[i]["y"],i);
			}			
		}
	}	
}

function canMove(x,y,pos){

	if(y<BX && matriz[x][y+1]===3){
		mover[pos]["dirX"]=0;
		mover[pos]["dirY"]=1;
		mover[pos]["cY"]++;
		mover[pos]["cX"]=0;
	}else if(y>BX && matriz[x][y-1]===3){
		mover[pos]["dirX"]=0;
		mover[pos]["dirY"]=-1;
		mover[pos]["cY"]++;
		mover[pos]["cX"]=0;
	}else if(x<BY && matriz[x+1][y]===3){
		mover[pos]["dirX"]=1;
		mover[pos]["dirY"]=0;
		mover[pos]["cX"]++;
		mover[pos]["cY"]=0;
	}else if (x>BY && matriz[x-1][y]===3) {
		mover[pos]["dirX"]=-1;
		mover[pos]["dirY"]=0;
		mover[pos]["cX"]++;
		mover[pos]["cY"]=0;
	}else if(matriz[x][y+1]===3){
		mover[pos]["dirX"]=0;
		mover[pos]["dirY"]=1;
		mover[pos]["cY"]++;
		mover[pos]["cX"]=0;
	}else if(matriz[x][y-1]===3){
		mover[pos]["dirX"]=0;
		mover[pos]["dirY"]=-1;
		mover[pos]["cY"]++;
		mover[pos]["cX"]=0;
	}else if(matriz[x+1][y]===3){
		mover[pos]["dirX"]=1;
		mover[pos]["dirY"]=0;
		mover[pos]["cX"]++;
		mover[pos]["cY"]=0;
	}else if (matriz[x-1][y]===3) {
		mover[pos]["dirX"]=-1;
		mover[pos]["dirY"]=0;
		mover[pos]["cX"]++;
		mover[pos]["cY"]=0;
	}
}

function addEntities(){
	for(let i=0; i<Map1.rows; i++){

		for(let j=0; j<Map1.cols; j++){

			if (j*Map1.size<=width) {
				
				switch(matriz[i][j]) {
					case 0:
						printBomber(i,j);
					break;
					case 1:
						image(sprite, j*Map1.size, i*Map1.size, Map1.size, Map1.size, 0, 241, 15, 16);
					break;
					case 2:
						image(sprite, j*Map1.size, i*Map1.size, Map1.size, Map1.size, 17, 241, 16, 16);
					break;
					case 3:
						image(sprite, j*Map1.size, i*Map1.size, Map1.size, Map1.size, 175, 1, 16, 16);
					break;
					case 4:
						image(sprite, j*Map1.size, i*Map1.size, Map1.size, Map1.size, 0 , 39, 14, 16)
					break;
					case 5:
						image(sprite, j*Map1.size, i*Map1.size, Map1.size, Map1.size, 84, 21, 14, 16)
					break;
					case 6:
						image(sprite, j*Map1.size, i*Map1.size, Map1.size, Map1.size, 179, 205, 16, 16);
					break;
					case 7:
						image(sprite, j*Map1.size, i*Map1.size, Map1.size, Map1.size, 179, 187, 16, 16);
					break;
					case 8:
						image(sprite, j*Map1.size, i*Map1.size, Map1.size, Map1.size, 179, 223, 16, 16);
					break;
					case 9:
						image(sprite, j*Map1.size, i*Map1.size, Map1.size, Map1.size, 161, 205, 16, 16);
					break;
					case 10:
						image(sprite, j*Map1.size, i*Map1.size, Map1.size, Map1.size, 197, 205, 16, 16);
					break;
					case 20:
						image(sprite, j*Map1.size, i*Map1.size, Map1.size, Map1.size, 0 , 164, 16, 16)
					break;
				}
			}
		}
	}

}

function printBomber(i,j){
	let wB=12;
	let hB=16;
	
	BX=i;
	BY=j;

	image(sprite, j*Map1.size, i*Map1.size, Map1.size, Map1.size, crops[dir].x, crops[dir].y, wB, hB);
}

function iniTablero(){
	countEnemy=0;
	matriz=Map1.tiles;
	let rnd;
	
	for(let i=0; i<Map1.rows; i++){
		for(let j=0; j<Map1.cols; j++){
			if(matriz[i][j]===4 || matriz[i][j]===20){
				countEnemy++;
				mover[n]=[];
				mover[n]["x"]=i;
				mover[n]["y"]=j;
				mover[n]["dirX"]=1;
				mover[n]["dirY"]=0;
				mover[n]["cX"]=0
				mover[n]["cY"]=0
				mover[n]["vida"]=Map1.enemyLives;
				mover[n]["tipo"]=matriz[i][j];
				n++;
			}
			if (i>1 && j>1 && matriz[i][j]!=1 && matriz[i][j]!=4 && matriz[i][j]!=20) {
				rnd=Math.round(random(0,3));
				rnd===2 ? matriz[i][j]=rnd : 0
			}
		}
	}
}

function keyPressed () {

	if (keyCode===LEFT_ARROW) {
		auxX=BX;
		auxY=BY-1;
		if(matriz[auxX][auxY]===3){
			auxVal=matriz[auxX][auxY];
			matriz[auxX][auxY]=matriz[BX][BY];
			matriz[BX][BY]=auxVal;
		}
	}

	if (keyCode===RIGHT_ARROW) {
		auxX=BX;
		auxY=BY+1;
		if(matriz[auxX][auxY]===3){
			auxVal=matriz[auxX][auxY];
			matriz[auxX][auxY]=matriz[BX][BY];
			matriz[BX][BY]=auxVal;
		}	
	}

	if (keyCode===UP_ARROW) {
		auxX=BX-1;
		auxY=BY;
		if(matriz[auxX][auxY]===3){
			auxVal=matriz[auxX][auxY];
			matriz[auxX][auxY]=matriz[BX][BY];
			matriz[BX][BY]=auxVal;
		}
	}

	if (keyCode===DOWN_ARROW) {
		auxX=BX+1;
		auxY=BY;
		if(matriz[auxX][auxY]===3){
			auxVal=matriz[auxX][auxY];
			matriz[auxX][auxY]=matriz[BX][BY];
			matriz[BX][BY]=auxVal;
		}
	}

	if(keyCode === LEFT_ARROW){
		dir=0;
	}

	if(keyCode === RIGHT_ARROW){
		dir=2;
	}

	if (keyCode === UP_ARROW) {
		dir=3;
	}

	if (keyCode === DOWN_ARROW) {
		dir=4;
	}
	if (keyCode ===32){
		if (matriz[BX][BY+1]===3) {
			matriz[BX][BY+1]=matriz[BX][BY];
			matriz[BX][BY]=5;
			setTimeout(bomba,2000,BX,BY);
		}else if(matriz[BX][BY-1]===3){
			matriz[BX][BY-1]=matriz[BX][BY];
			matriz[BX][BY]=5;
			setTimeout(bomba,2000,BX,BY);
		}else if(matriz[BX+1][BY]===3){
			matriz[BX+1][BY]=matriz[BX][BY];
			matriz[BX][BY]=5;
			setTimeout(bomba,2000,BX,BY);
		}else if(matriz[BX-1][BY]===3){
			matriz[BX-1][BY]=matriz[BX][BY];
			matriz[BX][BY]=5;
			setTimeout(bomba,2000,BX,BY);
		}
	}
}

function bomba(x,y){
	for(let i=1;i<n;i++){
		if(mover[i]!=null){
			if (matriz[x-1][y]!=1 && matriz[x-1][y]!=2) {
				if (mover[i]!=null && matriz[x-1][y]===mover[i]["tipo"]) {
					mover[i]["vida"]--;
				}
				if (mover[i]!=null && (mover[i]["vida"]<=0 || matriz[x-1][y]!=mover[i]["tipo"])) {
					matriz[x-1][y]=7;
				}
			}
			if (matriz[x+1][y]!=1 && matriz[x+1][y]!=2) {
				if (mover[i]!=null && matriz[x+1][y]===mover[i]["tipo"]) {
					mover[i]["vida"]--;
				}
				if (mover[i]!=null && (mover[i]["vida"]<=0 || matriz[x+1][y]!=mover[i]["tipo"])) {
					matriz[x+1][y]=8;
				}
			}
			if (matriz[x][y-1]!=1 && matriz[x][y-1]!=2) {
				if (mover[i]!=null && matriz[x][y-1]===mover[i]["tipo"]) {
					mover[i]["vida"]--;
				}
				if (mover[i]!=null && (mover[i]["vida"]<=0 || matriz[x][y-1]!=mover[i]["tipo"])) {
					matriz[x][y-1]=9
				}
			}
			if (matriz[x][y+1]!=1 && matriz[x][y+1]!=2) {
				if (mover[i]!=null && matriz[x][y-1]===mover[i]["tipo"]) {
					mover[i]["vida"]--;
				}
				if (mover[i]!=null && (mover[i]["vida"]<=0 || matriz[x][y+1]!=mover[i]["tipo"])) {
					matriz[x][y+1]=10
				}
			}
			matriz[x][y]=6;
		}
	}
	setTimeout(bombaClean,1000,x,y);
}

function nextLevel(){
	Map1 = Map2;
	countEnemy=0;
	iniTablero();

	world=2;
}

function bombaClean(x,y){
	for(let i=1;i<n;i++){
		if (matriz[x-1][y]!=1) {
			if (mover[i]!=null && mover[i]["y"]!=x-1 && (mover[i]["vida"]<=0 || matriz[x-1][y]!=mover[i]["tipo"])) {
				matriz[x-1][y]=3;
			}
		}
		if (matriz[x+1][y]!=1) {
			if (mover[i]!=null && mover[i]["y"]!=x+1 &&( mover[i]["vida"]<=0 || matriz[x+1][y]!=mover[i]["tipo"])) {
				matriz[x+1][y]=3;
			}
		}
		if (matriz[x][y-1]!=1) {
			if (mover[i]!=null && mover[i]["x"]!=y-1 && (mover[i]["vida"]<=0 || matriz[x][y-1]!=mover[i]["tipo"])) {
				matriz[x][y-1]=3;
			}
		}
		if (matriz[x][y+1]!=1) {
			if (mover[i]!=null && mover[i]["x"]!=y+1 && (mover[i]["vida"]<=0 || matriz[x][y+1]!=mover[i]["tipo"])) {
				matriz[x][y+1]=3;
			}
		}
		matriz[x][y]=3;
	}
	
	if(countEnemy<=0 && world===2){
		clear();
		textSize(50)
		text("Ganaste",width/2,height/2)
		noLoop();

	}else if (countEnemy<=0){
		setTimeout(nextLevel,1000);
	}
	if (((auxY!=BY || auxX!=BX) && matriz[auxX][auxY]===3) || matriz[BX][BY]===3) {
		clear();
		textSize(50)
		text("Perdiste",width/2,height/2)
		noLoop();
	}
}

function keyReleased () {
	dir=1;
}




var label;
async function loopMl(){



	ativarCamera();

	console.log(video);
	console.log(canvas);
	console.log(photo);
	photoDiv = document.getElementById('photo');
  	mbNet = await mobilenet.load()

	while(true){
		capturarImagem();
		label = await classificar(photo);
	  	console.log(label[0].className);
	  	//pushAButton();
	}
}

//captura um frame da camera
function ativarCamera() {     

	video = document.getElementById('video');
	canvas = document.getElementById('canvas');
	photo = document.getElementById('photo');
  
	
	//ativando a camera
	navigator.mediaDevices.getUserMedia({video: true, audio: false})
	.then(function(stream) {
		video.srcObject = stream;
		video.play();
	});

	video.setAttribute('width', widthInput);
	video.setAttribute('height', heightInput);
	canvas.setAttribute('width', widthInput);
	canvas.setAttribute('height', heightInput);

}


//captura um frame da camera
function capturarImagem() {
	var context = canvas.getContext('2d');
	context.drawImage(video, 0, 0, 244, 244);
  
	var data = canvas.toDataURL('image/png');
	photo.setAttribute('src', data);	
	console.log("aaa");
}


function classificar(imageInput) {
  return mbNet.classify(imageInput);
}


function pushAButton () {

	if (label[0].className == "nail" ) {
		auxX=BX;
		auxY=BY-1;
		if(matriz[auxX][auxY]===3){
			auxVal=matriz[auxX][auxY];
			matriz[auxX][auxY]=matriz[BX][BY];
			matriz[BX][BY]=auxVal;
		}
	}

	if (label[0].className == "nail") {
		auxX=BX;
		auxY=BY+1;
		if(matriz[auxX][auxY]===3){
			auxVal=matriz[auxX][auxY];
			matriz[auxX][auxY]=matriz[BX][BY];
			matriz[BX][BY]=auxVal;
		}	
	}

	if (label[0].className == "nail") {
		auxX=BX-1;
		auxY=BY;
		if(matriz[auxX][auxY]===3){
			auxVal=matriz[auxX][auxY];
			matriz[auxX][auxY]=matriz[BX][BY];
			matriz[BX][BY]=auxVal;
		}
	}

	if (label[0].className == "nail") {
		auxX=BX+1;
		auxY=BY;
		if(matriz[auxX][auxY]===3){
			auxVal=matriz[auxX][auxY];
			matriz[auxX][auxY]=matriz[BX][BY];
			matriz[BX][BY]=auxVal;
		}
	}

	if(label[0].className == "nail"){
		dir=0;
	}

	if(label[0].className == "nail"){
		dir=2;
	}

	if (label[0].className == "nail") {
		dir=3;
	}

	if (label[0].className == "nail") {
		dir=4;
	}
	if (label[0].className == "nail"){
		if (matriz[BX][BY+1]===3) {
			matriz[BX][BY+1]=matriz[BX][BY];
			matriz[BX][BY]=5;
			setTimeout(bomba,2000,BX,BY);
		}else if(matriz[BX][BY-1]===3){
			matriz[BX][BY-1]=matriz[BX][BY];
			matriz[BX][BY]=5;
			setTimeout(bomba,2000,BX,BY);
		}else if(matriz[BX+1][BY]===3){
			matriz[BX+1][BY]=matriz[BX][BY];
			matriz[BX][BY]=5;
			setTimeout(bomba,2000,BX,BY);
		}else if(matriz[BX-1][BY]===3){
			matriz[BX-1][BY]=matriz[BX][BY];
			matriz[BX][BY]=5;
			setTimeout(bomba,2000,BX,BY);
		}
	}
}