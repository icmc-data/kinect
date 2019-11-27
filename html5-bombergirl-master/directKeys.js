var keysCode = {
	'arrowUp': 	  38,
	'arrowLeft':  37,
	'arrowDown':  40,
	'arrowRight': 39,
	'space': 	  32,

	'a': 65,
	'w': 87,
	'd': 83,
	's': 68   
};

var buttonsPress = [
	keysCode['arrowLeft'],
	keysCode['arrowRight'],
	keysCode['arrowUp'],
	keysCode['arrowDown']
];

var buttonsClick = [
	keysCode['space']
];

function KeyPress(key) {
	
	var evt = new KeyboardEvent('keydown', {'keyCode':key, 'which':key});
	document.dispatchEvent (evt);
	var evt = new KeyboardEvent('keypress', {'keyCode':key, 'which':key});
	document.dispatchEvent (evt);	
	
	console.log("aqui");
}

function KeyRelease(key){
	var evt = new KeyboardEvent('keyup', {'keyCode':key, 'which':key});
	document.dispatchEvent (evt);
}

function KeyPressAndRelease(key){
	KeyPress(key);
	setTimeout(function () {
        KeyRelease(key);
    }, 100);
}

function pushButtonPress(result){

	for(var i = 0; i < buttonsPress;i++){
		KeyRelease(buttonsPress[i]);
	}

	if(result < buttonsPress.length){
		
		KeyPress(buttonsPress[result]);
	}
}

function pushButtonClick(result){
	for(var i = 0; i < buttonsPress;i++){
		KeyRelease(buttonsPress[i]);
	}

	if(result < buttonsClick.length){
		
		KeyPress(buttonsClick[result]);
		KeyRelease(buttonsClick[result]);
	}
}

function pushButton(result){
	console.log(result);
	console.log(buttonsPress.length);
	if(result < buttonsPress.length){
		pushButtonPress(result);
	}else if(result <  buttonsPress.length + buttonsClick.length){
		pushButtonClick(result - buttonsPress.length);
	}	
}

document.getElementById('botao').addEventListener('click', () => pushButton(4) );