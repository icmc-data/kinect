
let video = null;
let canvas = null;
let photo = null;
let imgButtons = [];
let samples = [[],[],[],[],[],[]];
const widthInput = 244;    
const heightInput = 244;
var label;


let sampleA = [];
async function loopMl(){

	ativarCamera();

	const classifier = knnClassifier.create();
  	mbNet = await mobilenet.load()

	while(true){
		capturarImagem();
		label = await classificar(photo);
	  	//console.log(label[0].className);
	  	//pushAButton();
	}
}


function ativarCamera() {     

	video = document.getElementById('video');
	canvas = document.getElementById('canvas');
    photo = document.getElementById('photo');

    
    for(let i=0;i<6;i++){
        imgButtons.push(document.getElementById('img-'+i));
    }



	
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

//ativa botoes que capturam samples das classes
function ativarBotao( butaoId){
    capturarImagem()
  
    //atualizando imagem encima do botao
	var data = canvas.toDataURL('image/png');
    imgButtons[butaoId].setAttribute('src', data);

    //salvando em samples
    samples[butaoId].push(data);
}
