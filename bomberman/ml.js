const classifier = knnClassifier.create();
let net;
let video = null;
let canvas = null;
let photo = null;
let imgButtons = [];
let samples = [[],[],[],[],[],[]];
const widthInput = 244;    
const heightInput = 244;
let result;
let loadNet = false;

let sampleA = [];

async function loopMl(){
	ativarCamera();

	net = await mobilenet.load()
	loadNet = true;
	console.log("load net")

	setInterval(classificar, 200);
}


async function classificar( ){
	if (classifier.getNumClasses() > 0) {
		capturarImagem();
		const activation = net.infer(photo, 'conv_preds');
		result = await classifier.predictClass(activation);
		result = result.label
		console.log(result)
		pushButton(result);
	}
}

function ativarCamera() {     

	video = document.getElementById('video');
	canvas = document.getElementById('canvass');
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
	//console.log("contexto")
	//console.log(context)
	context.drawImage(video, 0, 0, 244, 244);
  
	var data = canvas.toDataURL('image/png');
	//console.log("url")
	//console.log(canvas.toDataURL('image/png'));
	//console.log("data")
	//console.log(data);

	photo.setAttribute('src', data);

	//console.log("photo")
	//console.log(photo)
	//console.log("end")
}



//ativa botoes que capturam samples das classes
function ativarBotao( butaoId){
	if(!loadNet){
		return
	}

	capturarImagem();

	const activation = net.infer(photo, 'conv_preds');
	classifier.addExample(activation, butaoId);

  //console.log(classifier.getClassExampleCount());

    //atualizando imagem encima do botao
	var data = canvas.toDataURL('image/png');
    imgButtons[butaoId].setAttribute('src', data);
//
    ////salvando em samples
    //samples[butaoId].push(data);
}
