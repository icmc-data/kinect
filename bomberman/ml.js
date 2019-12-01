//modelos
const classifier = knnClassifier.create();
let net;

//partições do html
let video = null;
let canvas = null;
let photo = null;
let Imgbuttons = []
let buttons = []

//configurações
let numSamplesPerClick = 6
let tempoCapturaSample = 150
let tempoPrimeiraCapturaSample = 300
const widthInput = 244;    
const heightInput = 244;

let result;//label atual
let loadNet = false;
let sampleA = [];//samples salvas

async function loopMl(){
	ativarCamera();

	net = await mobilenet.load()
	loadNet = true;
	console.log("load net")

	for(let i=0;i<6;i++){
		buttons.push(document.getElementById('button-'+i));
		buttons[i].setAttribute("invisivel",false);
    }


	setInterval(classificar, 200);
}


async function classificar( ){
	if (classifier.getNumClasses() > 0) {
		capturarImagem();
		const activation = net.infer(photo, 'conv_preds');
		result = await classifier.predictClass(activation);
		result = result.label
		//console.log(result)
		pushButton(result);
	}
}

function ativarCamera() {     

	video = document.getElementById('video');
	canvas = document.getElementById('canvass');
    photo = document.getElementById('photo');

    
    for(let i=0;i<6;i++){
        Imgbuttons.push(document.getElementById('img-'+i));
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
	for(let i=0;i<6;i++){
		let divImg = document.getElementById("img-"+i);
		divImg.setAttribute('width', widthInput);
		divImg.setAttribute('height', heightInput);
	}

}


//captura um frame da camera
function capturarImagem() {
	var context = canvas.getContext('2d');
	context.drawImage(video, 0, 0, 244, 244);
  
	var data = canvas.toDataURL('image/png');
	photo.setAttribute('src', data);
}


botaoAtivo = [false,false,false,false,false,false]
//ativa botoes que capturam samples das classes
function ativarBotao( botaoId){
	if(!loadNet){
		return
	}
	if(botaoAtivo[botaoId] == false){
		capturarImagem();

		//colocando no knn
		const activation = net.infer(photo, 'conv_preds');
		classifier.addExample(activation, botaoId);
	
		//atualizando imagem encima do botao
		var data = canvas.toDataURL('image/png');
		Imgbuttons[botaoId].setAttribute('src', data);
	}
}


