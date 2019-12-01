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
	
}

function KeyRelease(key){
	var evt = new KeyboardEvent('keyup', {'keyCode':key, 'which':key});
	document.dispatchEvent (evt);
}

function KeyPressAndRelease(key){
	KeyPress(key);
	setTimeout(function () {
        KeyRelease(key);
    }, 300);
}

function pushButtonPress(result){

	for(var i = 0; i < buttonsPress.length;i++){
		KeyRelease(buttonsPress[i]);
	}
	
	if(result < buttonsPress.length){
		
		KeyPress(buttonsPress[result]);
	}
}

function pushButtonClick(result){
	for(var i = 0; i < buttonsPress.length;i++){
		KeyRelease(buttonsPress[i]);
	}

	if(result < buttonsClick.length){
		
		KeyPress(buttonsClick[result]);
		KeyRelease(buttonsClick[result]);
	}
}

function pushButton(result){

	if(result < buttonsPress.length){
		pushButtonPress(result);
	}else if(result <  buttonsPress.length + buttonsClick.length){
		pushButtonClick(result - buttonsPress.length);
	}	
}